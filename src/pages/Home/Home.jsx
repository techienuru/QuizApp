// import { useState } from "react";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
      <main>
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
              <button type="button" className={`btn ${styles.playBtn}`}>
                Play Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
