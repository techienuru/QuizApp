import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./Quiz.module.css";
const Quiz = () => {
  return (
    <>
      <main className={`${styles.quiz}`}>
        <div className="container py-3">
          <section className={`mb-3 ${styles.heading}`}>
            <div className="d-flex justify-content-center">
              <div className={`text-center`}>
                <p>
                  Category Name <span>(Difficulty)</span>
                </p>
                <p>Multiple Choice</p>
              </div>
            </div>
          </section>

          <section className={`mb-3 ${styles.questionCardSection}`}>
            <div className="container p-0">
              <QuestionCard />
            </div>
          </section>

          <div className={`${styles.progressBtns}`}>
            <div className="d-flex justify-content-end gap-3">
              <button type="button" className={`btn ${styles.prevBtn}`}>
                Previous
              </button>
              <button type="button" className={`btn ${styles.nextBtn}`}>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Quiz;
