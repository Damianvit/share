"use client";

import { useRef, useState } from "react";

export default function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState("");

    async function handleUpload() {
        const files = fileInputRef.current?.files;
        if (!files || files.length === 0) {
            setStatus("No file selected.");
            return;
        }

        const formData = new FormData();
        const statusLines: string[] = []; // <- this is statusLines

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            formData.append("files", file);
            statusLines.push(
                `${file.name} (${(file.size / 1024).toFixed(2)} KB)`
            ); // <- gather info
        }

        setStatus("Uploading...");

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setStatus(`Upload successful ✅\n${statusLines.join("\n")}`);
            } else {
                setStatus("Upload failed ❌");
            }
        } catch (err) {
            console.error(err);
            setStatus("An error occurred ❌");
        }
    }

    return (
        <div className="space-y-2">
            <input type="file" multiple ref={fileInputRef} />
            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-1 rounded"
            >
                Upload
            </button>
            <p>{status}</p>
        </div>
    );
}
