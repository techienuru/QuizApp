import { useState } from "react";
import PlayOptionsModal from "../../components/Modals/PlayOptionsModal/PlayOptionsModal";
import UploadModal from "../../components/Modals/UploadModal/UploadModal";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";

const steps = [
  {
    title: "Pick how you want to play.",
    text: "Choose a topic you like, or bring your own paper.",
  },
  {
    title: "Answer the questions.",
    text: "Tap the answer you think is right.",
  },
  {
    title: "See your score.",
    text: "Find out how many you got right. Play again if you want.",
  },
];

const playWays = [
  {
    title: "Play ready-made quizzes.",
    text: "Pick something you like: animals, sports, movies, and more. We ask the questions. You pick the answers.",
  },
  {
    title: "Bring your own paper.",
    text: "Have notes, a lesson, or a story? Hand us the file. We read it and make new questions just for you. PDF and text files work. Up to 20 questions.",
  },
];

const reasons = [
  {
    title: "It's free.",
    text: "No money. No signing in. Just play.",
  },
  {
    title: "It's fast.",
    text: "Your questions are ready in seconds.",
  },
  {
    title: "It's for everyone.",
    text: "Easy ones, hard ones, and everything in between.",
  },
  {
    title: "It uses your own notes.",
    text: "Turn your school work into a game.",
  },
];

const Home = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const currentYear = new Date().getFullYear();
  const copyrightYears = currentYear > 2025 ? `2025\u2013${currentYear}` : "2025";

  return (
    <>
      <Navbar onPlayNow={() => setisModalOpen(true)} />

      <main className={styles.page}>
        {isModalOpen && <PlayOptionsModal setisModalOpen={setisModalOpen} />}
        {showUpload && <UploadModal setShowUpload={setShowUpload} />}

        <section
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
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.sectionSubtitle}>Three easy steps. That is it.</p>

          <div className={styles.steps}>
            {steps.map((step, index) => (
              <div key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="two-ways" className={styles.section}>
          <h2 className={styles.sectionTitle}>Two ways to play</h2>
          <p className={styles.sectionSubtitle}>
            Pick the one that fits you today.
          </p>

          <div className={styles.ways}>
            {playWays.map((way) => (
              <div key={way.title} className={styles.wayCard}>
                <h3 className={styles.wayTitle}>{way.title}</h3>
                <p className={styles.wayText}>{way.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="why" className={styles.section}>
          <h2 className={styles.sectionTitle}>Why you'll like it</h2>
          <p className={styles.sectionSubtitle}>
            Simple, quick, and made for everyone.
          </p>

          <div className={styles.reasons}>
            {reasons.map((reason) => (
              <div key={reason.title} className={styles.reason}>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonText}>{reason.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; {copyrightYears} 
          <span> Developed by </span>   
          <a href="https://github.com/techienuru" target="_blank" rel="noopener noreferrer">Techienuru</a>
        </p>
      </footer>
    </>
  );
};

export default Home;
