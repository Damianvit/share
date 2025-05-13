import fs from "fs";
import path from "path";
import Upload from "./components/Upload";

export default async function Home() {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const files = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];

    return (
        <main className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">📁 Simple File Uploader</h1>

            <Upload />

            <div>
                <h2 className="text-lg font-semibold mt-4">Uploaded Files</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {files.map((file) => {
                        const ext = path.extname(file).toLowerCase();
                        const isImage = [
                            ".jpg",
                            ".jpeg",
                            ".png",
                            ".gif",
                            ".webp",
                        ].includes(ext);
                        const isVideo = [".mp4", ".webm", ".ogg"].includes(ext);
                        const isAudio = [".mp3", ".wav", ".ogg"].includes(ext);
                        const isPDF = [".pdf"].includes(ext);
                        const isText = [".txt", ".md", ".csv", ".log"].includes(
                            ext
                        );

                        const fileUrl = `/uploads/${file}`;

                        return (
                            <li
                                key={file}
                                className="border rounded p-2 text-center"
                            >
                                <div className="mb-2">
                                    {isImage && (
                                        <img
                                            src={fileUrl}
                                            alt={file}
                                            className="w-full h-40 object-cover rounded"
                                        />
                                    )}

                                    {isVideo && (
                                        <video
                                            src={fileUrl}
                                            controls
                                            className="w-full h-40 object-cover rounded"
                                        />
                                    )}

                                    {isAudio && (
                                        <audio controls className="w-full">
                                            <source src={fileUrl} />
                                            Your browser does not support the
                                            audio element.
                                        </audio>
                                    )}

                                    {isPDF && (
                                        <div className="text-gray-500 text-sm mb-2">
                                            PDF
                                        </div>
                                    )}

                                    {isText && (
                                        <iframe
                                            src={fileUrl}
                                            className="w-full h-40 bg-gray-100 text-sm p-2"
                                            title={file}
                                        />
                                    )}

                                    {!isImage &&
                                        !isVideo &&
                                        !isAudio &&
                                        !isPDF &&
                                        !isText && (
                                            <div className="text-gray-500 text-sm">
                                                No preview available
                                            </div>
                                        )}
                                </div>

                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-blue-600 underline break-words"
                                >
                                    {file}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </main>
    );
}
