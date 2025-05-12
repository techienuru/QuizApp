import styles from "./QuestionCard.module.css";

const QuestionCard = () => {
  return (
    <>
      <div className={`card ${styles.questionCard}`}>
        <div className={`card-title ${styles.questionCardTitle}`}>
          <div className="d-flex justify-content-between align-items-center p-3">
            <p className={`${styles.questionNo}`}>Questions: 3/30</p>
            <p className={`${styles.timeRemaining}`}>08:20</p>
            <button type="button" className={`btn ${styles.quitBtn}`}>
              Quit
            </button>
          </div>
        </div>
        <div className={`card-body ${styles.questionCardBody}`}>
          <form>
            <label htmlFor="" className={`${styles.question}`}>
              <span>Q: </span>
              Who is making the web standard?
            </label>
            <article className={`${styles.options}`}>
              <div className={`form-check ${styles.formCheck}`}>
                <input
                  type="radio"
                  name="question1"
                  id="option1"
                  className={`form-check-input`}
                />
                <label htmlFor="question1" className="form-check-label">
                  The World Wide Web Consortium
                </label>
              </div>
              <div className={`form-check ${styles.formCheck}`}>
                <input
                  type="radio"
                  name="question1"
                  id="option2"
                  className={`form-check-input`}
                />
                <label htmlFor="question1" className="form-check-label">
                  Google
                </label>
              </div>
              <div className={`form-check ${styles.formCheck}`}>
                <input
                  type="radio"
                  name="question1"
                  id="option3"
                  className={`form-check-input`}
                />
                <label htmlFor="question1" className="form-check-label">
                  Microsoft
                </label>
              </div>
              <div className={`form-check ${styles.formCheck}`}>
                <input
                  type="radio"
                  name="question1"
                  id="option4"
                  className={`form-check-input`}
                />
                <label htmlFor="question1" className="form-check-label">
                  Mozilla
                </label>
              </div>
            </article>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
