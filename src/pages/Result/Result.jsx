import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Result.module.css";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalQues, answered, correct, wrong } = location.state || {
    totalQues: 0,
    answered: 0,
    correct: 0,
    wrong: 0,
  };
  const scoresPercent = ((correct * 100) / totalQues).toFixed(2) || 0;
  const completionRate = (answered * 100) / totalQues || 0;

  return (
    <>
      <main className={styles.result}>
        <div className={`container ${styles.resultContainer}`}>
          <div className="d-flex justify-content-center align-items-center flex-column gap-5 py-5">
            <section className={`${styles.scoresSection}`}>
              <div className={`${styles.scoresCardOuter}`}>
                <div className={`${styles.scoresCardInner}`}>
                  <p className="text-white">Your Score</p>
                  <p className="text-white">{scoresPercent}/100</p>
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
                          <span>{completionRate}%</span>
                          <span>Completion</span>
                        </p>
                      </div>

                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span className="text-success fw-bold">
                            {correct}
                          </span>
                          <span>Correct</span>
                        </p>
                      </div>

                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span>{totalQues}</span>
                          <span>Total Questions</span>
                        </p>
                      </div>

                      <div className={`col ${styles.scoresbreakdownItem}`}>
                        <p className="d-flex flex-column">
                          <span className="text-danger fw-bold">{wrong}</span>
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
                  <Link
                    to={() => {
                      navigate(-1);
                    }}
                    className={`${styles.ctaItemLink}`}
                  >
                    <p>
                      <i
                        className={`fas fa-rotate-right ${styles.ctaItemIcon} ${styles.playAgain}`}
                        aria-hidden="true"
                        title="Replay"
                      ></i>
                    </p>
                    <p className={`${styles.ctaItemText}`}>Replay</p>
                  </Link>

                  <Link to="/" className={`${styles.ctaItemLink}`}>
                    <p>
                      <i
                        className={`fas fa-home ${styles.ctaItemIcon} ${styles.home}`}
                        aria-hidden="true"
                        title="Go Home"
                      ></i>
                    </p>
                    <p className={`${styles.ctaItemText}`}>Home</p>
                  </Link>

                  <Link to="/leaderboard" className={`${styles.ctaItemLink}`}>
                    <p>
                      <i
                        className={`fas fa-trophy ${styles.ctaItemIcon} ${styles.leaderboard}`}
                        aria-hidden="true"
                        title="Leaderboard"
                      ></i>
                    </p>
                    <p className={`${styles.ctaItemText}`}>Leaderboard</p>
                  </Link>
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
