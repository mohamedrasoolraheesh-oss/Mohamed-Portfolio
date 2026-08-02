import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";
const FOLDER_NAME = Deno.env.get("CERT_DRIVE_FOLDER_NAME") ?? "Certificates";
const FOLDER_ID = Deno.env.get("CERT_DRIVE_FOLDER_ID") ?? "";

function authHeaders() {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const driveKey = Deno.env.get("GOOGLE_DRIVE_API_KEY");
  if (!lovableKey || !driveKey) throw new Error("Google Drive connection is not configured");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": driveKey,
  };
}

async function driveGet(path: string, params: Record<string, string>) {
  const url = new URL(`${GATEWAY}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { headers: authHeaders() });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Drive request failed [${res.status}]: ${body}`);
    throw new Error(`[${res.status}]: ${body}`);
  }
  return await res.json();
}

const FILE_FIELDS = "files(id,name,mimeType,modifiedTime,webViewLink,thumbnailLink),nextPageToken";
const MEDIA_Q = "(mimeType contains 'image/' or mimeType='application/pdf')";

async function listAll(q: string) {
  const out: Record<string, string>[] = [];
  let pageToken = "";
  do {
    const params: Record<string, string> = {
      q,
      fields: FILE_FIELDS,
      orderBy: "modifiedTime desc",
      pageSize: "1000",
      includeItemsFromAllDrives: "true",
      supportsAllDrives: "true",
      corpora: "allDrives",
    };
    if (pageToken) params.pageToken = pageToken;
    const page = await driveGet("/files", params);
    out.push(...(page.files ?? []));
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Collect all folders once so we can resolve the target folder and its subfolders
    const folders = await listAll(
      "mimeType='application/vnd.google-apps.folder' and trashed=false",
    );

    let rootId = FOLDER_ID;
    if (!rootId) {
      rootId =
        folders.find((f) => (f.name ?? "").toLowerCase() === FOLDER_NAME.toLowerCase())?.id ?? "";
    }

    let files: Record<string, string>[] = [];
    let scope = "folder";

    if (rootId) {
      // walk the folder tree (folder + all nested subfolders)
      const ids = new Set([rootId]);
      let frontier = [rootId];
      while (frontier.length) {
        const next: string[] = [];
        for (const id of frontier) {
          const subs = await listAll(
            `'${id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
          );
          for (const s of subs) {
            if (!ids.has(s.id)) {
              ids.add(s.id);
              next.push(s.id);
            }
          }
        }
        frontier = next;
      }
      for (const id of ids) {
        files.push(...(await listAll(`'${id}' in parents and trashed=false and ${MEDIA_Q}`)));
      }
    } else {
      // No "Certificates" folder — fall back to certificate-looking files anywhere in the Drive
      scope = "all-drive";
      const all = await listAll(`trashed=false and ${MEDIA_Q}`);
      files = all.filter((f) =>
        /cert|credential|badge|internship|completion|course|training/i.test(f.name ?? "")
      );
    }

    // de-duplicate by id
    const seen = new Set<string>();
    const items = files
      .filter((f) => (seen.has(f.id) ? false : (seen.add(f.id), true)))
      .map((f) => ({
        id: f.id,
        title: (f.name ?? "").replace(/\.(pdf|jpe?g|png|webp|gif)$/i, "").replace(/[_-]+/g, " ")
          .trim(),
        mimeType: f.mimeType,
        modifiedTime: f.modifiedTime,
        url: f.webViewLink ?? `https://drive.google.com/file/d/${f.id}/view`,
        image: f.thumbnailLink
          ? f.thumbnailLink.replace(/=s\d+$/, "=s1000")
          : `https://drive.google.com/thumbnail?id=${f.id}&sz=w1000`,
      }));

    return new Response(
      JSON.stringify({ items, folderFound: Boolean(rootId), folderId: rootId, scope, count: items.length }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("drive-certificates failed:", message);
    return new Response(JSON.stringify({ error: "Drive request failed", details: message }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
