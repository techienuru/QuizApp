import { useState } from "react";
import PlayOptionsModal from "../../components/Modals/PlayOptionsModal/PlayOptionsModal";
import UploadModal from "../../components/Modals/UploadModal/UploadModal";
import styles from "./Home.module.css";
const Home = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <main>
        {isModalOpen && <PlayOptionsModal setisModalOpen={setisModalOpen} />}
        {showUpload && <UploadModal setShowUpload={setShowUpload} />}

        <div
          className={`d-flex justify-content-center align-items-center ${styles.container}`}
        >
          <div className={`${styles.card}`}>
            <h2 className={`${styles.cardTitle}`}>
              Test Your Knowledge & Have Fun!
            </h2>
            <p className={`${styles.cardDescription}`}>
              Challenge yourself with our exciting quiz app.
            </p>
            <div
              className={`d-flex gap-3 justify-content-center ${styles.CtaBtnContainer}`}
            >
              <button
                type="button"
                className={`btn ${styles.playBtn}`}
                onClick={() => setisModalOpen(true)}
              >
                Play Now
              </button>
              <button
                type="button"
                className={`btn ${styles.uploadBtn}`}
                onClick={() => setShowUpload(true)}
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
