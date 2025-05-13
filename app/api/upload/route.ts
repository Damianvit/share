// app/api/upload/route.ts
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return new Response("No files uploaded", { status: 400 });
        }

        const savedFiles = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadPath = path.join(
                process.cwd(),
                "public",
                "uploads",
                file.name
            );
            await writeFile(uploadPath, buffer);
            savedFiles.push(file.name);
        }

        return new Response(
            JSON.stringify({ success: true, files: savedFiles }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Upload failed:", err);
        return new Response("Upload error", { status: 500 });
    }
}
