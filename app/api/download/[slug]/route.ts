import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getResource } from "@/lib/content";
import { verifyDownloadKey } from "@/lib/signing";

/**
 * Streams a gated deliverable. The files live outside /public precisely so
 * that this route is the only way to reach them, which keeps the email address
 * the actual price of the download rather than a formality.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const key = new URL(request.url).searchParams.get("k") ?? "";

  const resource = getResource(slug);
  if (!resource || !resource.deliverable) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!verifyDownloadKey(slug, key)) {
    return new NextResponse("This link is not valid.", { status: 403 });
  }

  // Resolved against the project root, and pinned inside the resources folder
  // so a crafted slug cannot walk out of it.
  const root = path.join(process.cwd(), "content", "resources", "files");
  const file = path.resolve(process.cwd(), resource.deliverable);
  if (!file.startsWith(root + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const body = await readFile(file);
    return new NextResponse(new Uint8Array(body), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${path.basename(file)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
