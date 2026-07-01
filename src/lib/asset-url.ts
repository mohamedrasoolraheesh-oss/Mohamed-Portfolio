// Lovable asset pointers store a *relative* URL like "/__l5e/assets-v1/<id>/<file>".
// That path is only resolvable on Lovable's own hosting. When the same build is
// served from a different origin (Vercel, Netlify, a custom domain that isn't
// proxied through Lovable, etc.) the path 404s and — for SPA fallbacks — gets
// served the app's index.html, which breaks <video>, <img>, and <a href> links.
//
// toAssetUrl() normalizes any pointer's `url` to an absolute Lovable CDN URL so
// assets load correctly regardless of where the app is deployed.

const LOVABLE_ASSET_HOST =
  (import.meta.env.VITE_LOVABLE_ASSET_HOST as string | undefined) ??
  "https://id-preview--058cd204-f603-4ee2-8e14-64a93ec5c3c7.lovable.app";

export function toAssetUrl(input: string | { url: string }): string {
  const url = typeof input === "string" ? input : input.url;
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/__l5e/")) return `${LOVABLE_ASSET_HOST}${url}`;
  return url;
}
