import { useState } from "react";
import styles from "./UploadModal.module.css";
import { useNavigate } from "react-router-dom";
import useExtractTextFromFile from "../../../hooks/useExtractTextFromFile";

const UploadModal = ({ setShowUpload }) => {
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState(null);
  const [error, setError] = useState(null);
  const [noOfQuestions, setNoOfQuestions] = useState(1);

  const { extractTextFromFile, isExtracting, extractingError } =
    useExtractTextFromFile();

  const navigate = useNavigate();

  const handleFileChange = async function (e) {
    setError(null);
    const f = e.target.files[0];

    if (f && (f.type === "application/pdf" || f.type === "text/plain")) {
      setFile(f);
    } else {
      setError("Please upload a PDF or plain text file.");
    }

    const text = await extractTextFromFile(f);
    setFileText(text);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!file) return setError("No file selected!");
    if (!fileText) return setError("Still extracting text... please wait");

    setShowUpload(false); // Close Modal
    navigate("/quiz", {
      state: {
        generated: true,
        sourceText: fileText,
        noOfQuestions,
      },
    });
  };

  return (
    <>
      <section className={`${styles.uploadModal}`}>
        <div className={`container w-auto p-3 ${styles.modalContent}`}>
          <div
            className={`d-flex justify-content-between border-bottom my-3 p-3 ${styles.modalHeader}`}
          >
            <h2 className={`${styles.modalTitle}`}>Upload Your Material</h2>
            <button
              type="button"
              className={`btn btn-close ${styles.closeBtn}`}
              onClick={() => setShowUpload(false)}
            ></button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`mb-3 ${styles.formItem}`}>
              <label htmlFor="noOfQuestions">Number of questions</label>
              <input
                type="number"
                id="noOfQuestions"
                className={`form-control`}
                defaultValue={noOfQuestions}
                onChange={(e) => setNoOfQuestions(e.target.value)}
                min="1"
                max="20"
                required
              />
              <span className="form-text text-warning">Min: 1, Max: 20</span>
            </div>
            <div className={`mb-3 ${styles.formItem}`}>
              <input
                type="file"
                id="file"
                className={`form-control`}
                accept=".pdf,.txt"
                onChange={handleFileChange}
                required
              />
              <span className="form-text text-warning">
                Only .pdf, and .txt format are allowed
              </span>
              {error && (
                <p className="form-text text-danger fw-bold">{error}</p>
              )}
              {extractingError && (
                <p className="form-text text-danger fw-bold">
                  {extractingError}
                </p>
              )}
              {isExtracting && (
                <p className="form-text text-white">
                  Extracting file content...
                </p>
              )}
            </div>
            <button type="submit" className={`btn w-100 ${styles.playBtn}`}>
              Start Quiz
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UploadModal;
