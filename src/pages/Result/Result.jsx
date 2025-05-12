import styles from "./Result.module.css";

const Result = () => {
  return (
    <>
      <main className={styles.result}>
        <div className={`container ${styles.resultContainer}`}>
          <div className="d-flex justify-content-center align-items-center flex-column gap-5 py-5">
            <section className={`${styles.scoresSection}`}>
              <div className={`${styles.scoresCardOuter}`}>
                <div className={`${styles.scoresCardInner}`}>
                  <p className="text-white">Your Score</p>
                  <p className="text-white">29/30</p>
                </div>
              </div>
            </section>

            <section className={`${styles.scoresBreakdownSection}`}>
              <div className="container">
                <div className={`card ${styles.breakdownCard}`}>
                  <div className="card-body p-sm-4">
                    <div className="row justify-content-between row-cols-2 gy-3">
                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span>100%</span>
                          <span>Completion</span>
                        </p>
                      </div>
                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span>20</span>
                          <span>Total Questions</span>
                        </p>
                      </div>
                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span>13</span>
                          <span>Correct</span>
                        </p>
                      </div>
                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span>07</span>
                          <span>Wrong</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={`${styles.ctaBtnsSection}`}>
              <div className="container">
                <div className="d-flex justify-content-around flex-wrap gap-sm-5">
                  <a href="#" className={`${styles.ctaItemLink}`}>
                    <p>
                      <i
                        className={`fas fa-rotate-right ${styles.ctaItemIcon} ${styles.playAgain}`}
                        aria-hidden="true"
                        title="Play Again"
                      ></i>
                    </p>
                    <p className={`${styles.ctaItemText}`}>Play Again</p>
                  </a>
                  <a href="#" className={`${styles.ctaItemLink}`}>
                    <p>
                      <i
                        className={`fas fa-home ${styles.ctaItemIcon} ${styles.home}`}
                        aria-hidden="true"
                        title="Go Home"
                      ></i>
                    </p>
                    <p className={`${styles.ctaItemText}`}>Home</p>
                  </a>
                  <a href="#" className={`${styles.ctaItemLink}`}>
                    <p>
                      <i
                        className={`fas fa-trophy ${styles.ctaItemIcon} ${styles.leaderboard}`}
                        aria-hidden="true"
                        title="Leaderboard"
                      ></i>
                    </p>
                    <p className={`${styles.ctaItemText}`}>Leaderboard</p>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Result;
