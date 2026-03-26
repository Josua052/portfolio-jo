// src/lib/gdrive.ts

/**
 * Extract Google Drive file ID from various URL formats.
 */
export function extractGDriveFileId(url: string): string | null {
  // /file/d/{ID}/view
  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) return match1[1];

  // ?id={ID} or &id={ID}
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) return match2[1];

  // Raw ID (letters, numbers, dashes, underscores only)
  if (/^[a-zA-Z0-9_-]+$/.test(url)) return url;

  return null;
}

/**
 * ❌ DEPRECATED — Google Drive /uc?export=view returns 403 since 2024.
 * Kept for reference only. Do NOT use this in <img> or next/image.
 */
export function gdriveDirectUrl(fileIdOrUrl: string): string {
  const id = extractGDriveFileId(fileIdOrUrl) ?? fileIdOrUrl;
  return `https://drive.google.com/uc?export=view&id=${id}`;
}

/**
 * ✅ OPTION 1: lh3 thumbnail URL.
 * Works for publicly shared files without login.
 * Add "lh3.googleusercontent.com" to next.config.js remotePatterns.
 *
 * @param fileIdOrUrl  Drive file ID or any Drive URL
 * @param width        Desired width in pixels (default 1200)
 */
export function gdriveThumbnailUrl(fileIdOrUrl: string, width = 1200): string {
  const id = extractGDriveFileId(fileIdOrUrl) ?? fileIdOrUrl;
  return `https://lh3.googleusercontent.com/d/${id}=w${width}`;
}

/**
 * ✅ OPTION 2 (recommended): Use your own Next.js proxy route.
 * Fetches the image server-side → no CORS issues.
 * Place the route at /src/app/api/gdrive/[id]/route.ts
 *
 * @param fileIdOrUrl  Drive file ID or any Drive URL
 */
export function gdriveProxyUrl(fileIdOrUrl: string): string {
  const id = extractGDriveFileId(fileIdOrUrl) ?? fileIdOrUrl;
  return `/api/gdrive/${id}`;
}