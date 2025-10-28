export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    // Run only in browser (not during SSR)
    if (typeof window === "undefined" || typeof document === "undefined") {
        return {
            imageUrl: "",
            file: null,
            error: "PDF conversion only works in the browser",
        };
    }

    try {
        // 🟢 Dynamically import pdfjs only in browser
        const pdfjsLib = await import("pdfjs-dist");
        const workerUrl = await import("pdfjs-dist/build/pdf.worker.mjs?url");

        // Tell pdfjs where to find its worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.default;

        // Load the PDF
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        // Take the first page
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 3 });

        // Render to a canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            await page.render({ canvasContext: context, viewport, canvas }).promise;
        }

        // Convert to blob and return
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const imageFile = new File([blob], `${file.name.replace(/\.pdf$/, "")}.png`, {
                        type: "image/png",
                    });

                    resolve({
                        imageUrl: URL.createObjectURL(blob),
                        file: imageFile,
                    });
                } else {
                    resolve({
                        imageUrl: "",
                        file: null,
                        error: "Failed to create image blob",
                    });
                }
            }, "image/png");
        });
    } catch (err) {
        console.error("PDF to image conversion error:", err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${String(err)}`,
        };
    }
}
