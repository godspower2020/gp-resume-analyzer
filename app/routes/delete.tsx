import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import SpinnerLoading from "~/components/loading/SpinnerLoading";

const DeleteResume = () => {
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            for (const file of files) {
                await fs.delete(file.path);
            }
            await kv.flush();
            await loadFiles();
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-[100vh]">
                <SpinnerLoading size={50} color="#3a3663" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-[100vh]">
                Error {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100vh]">
            Authenticated as: {auth.user?.username}
            <div className="mt-6">Existing files:</div>

            <div className="flex flex-col gap-4">
                {files.map((file) => (
                    <div key={file.id} className="flex flex-row gap-4">
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>

            <div>
                <button
                    className={`bg-blue-500 text-white px-4 py-2 mt-10 rounded-md cursor-pointer flex items-center justify-center gap-2 ${
                        isDeleting ? "opacity-75 cursor-not-allowed" : ""}`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <>
                            <SpinnerLoading />
                            <span>Wiping...</span>
                        </>
                    ) : (
                        "Wipe App Data"
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeleteResume;
