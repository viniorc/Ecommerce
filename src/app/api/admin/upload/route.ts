import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

const MAX_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Arquivo invalido." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Formato nao suportado." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Arquivo excede 3MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${randomUUID()}.webp`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });

  try {
    await sharp(buffer)
      .resize(1600, 1600, { fit: "inside" })
      .webp({ quality: 80 })
      .toFile(filePath);
  } catch {
    return NextResponse.json(
      { error: "Falha ao processar a imagem." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/uploads/${fileName}` });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const url = body?.url as string | undefined;

  if (!url || !url.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Url invalida." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", url);

  try {
    await fs.unlink(filePath);
  } catch {
    // ignore missing file
  }

  return NextResponse.json({ ok: true });
}
