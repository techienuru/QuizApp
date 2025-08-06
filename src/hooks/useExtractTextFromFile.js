import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import { useState } from "react";

// Correctly set the workerSrc for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Tell Vite how to resolve the worker file
// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   "../../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs",
//   import.meta.url
// ).href;

const useExtractTextFromFile = function () {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractingError, setExtractingError] = useState(null);

  async function extractTextFromFile(file) {
    if (file.type === "text/plain") return file.text();

    try {
      setIsExtracting(true);

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContentObj = await page.getTextContent();

        textContentObj.items.forEach((item) => {
          fullText += item.str + " ";
        });
      }

      return fullText;
    } catch (err) {
      setExtractingError(err.message);
    } finally {
      setIsExtracting(false);
    }
  }

  return { extractTextFromFile, isExtracting, extractingError };
};

export default useExtractTextFromFile;
