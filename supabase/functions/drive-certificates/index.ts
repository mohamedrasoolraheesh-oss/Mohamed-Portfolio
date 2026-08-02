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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    let folderId = FOLDER_ID;

    if (!folderId) {
      // Drive API `name=` is case-sensitive, so fetch all folders and match in code
      const folders = await driveGet("/files", {
        q: `mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: "files(id,name)",
        pageSize: "100",
      });
      const match = (folders.files ?? []).find(
        (f: Record<string, string>) => f.name?.toLowerCase() === FOLDER_NAME.toLowerCase(),
      );
      folderId = match?.id ?? "";
    }

    if (!folderId) {
      return new Response(
        JSON.stringify({
          items: [],
          folderFound: false,
          folderName: FOLDER_NAME,
          message: `No Google Drive folder named "${FOLDER_NAME}" was found.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const listed = await driveGet("/files", {
      q: `'${folderId}' in parents and trashed=false and (mimeType contains 'image/' or mimeType='application/pdf')`,
      fields: "files(id,name,mimeType,modifiedTime,webViewLink,thumbnailLink)",
      orderBy: "modifiedTime desc",
      pageSize: "100",
    });

    const items = (listed.files ?? []).map((f: Record<string, string>) => ({
      id: f.id,
      title: (f.name ?? "").replace(/\.(pdf|jpe?g|png|webp)$/i, "").replace(/[_-]+/g, " ").trim(),
      mimeType: f.mimeType,
      modifiedTime: f.modifiedTime,
      url: f.webViewLink ?? `https://drive.google.com/file/d/${f.id}/view`,
      image: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1000`,
    }));

    return new Response(JSON.stringify({ items, folderFound: true, folderId }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("drive-certificates failed:", message);
    return new Response(JSON.stringify({ error: "Drive request failed", details: message }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
