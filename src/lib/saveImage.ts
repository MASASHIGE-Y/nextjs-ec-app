import { mkdir, writeFile } from "fs/promises"
import path from "path"

export async function saveImage(file: File) {
  if (!file || file.size === 0) {
    return null
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const safeFileName = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "-")}`
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  const filePath = path.join(uploadDir, safeFileName)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, buffer)

  return `/uploads/${safeFileName}`
}