import { useParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./Quiz.module.css";
import { useEffect, useState } from "react";
const Quiz = () => {
  const { noOfQuestion, categoryId, difficulty, questionType } = useParams();
  const [quizQues, setQuizQues] = useState();

  useEffect(() => {
    const fetchQuizQues = async () => {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${noOfQuestion}&category=${categoryId}&difficulty=${difficulty}&type=${questionType}`
      );
      const data = await res.json();
      console.log(data);
    };

    fetchQuizQues();
  }, [quizQues]);

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
              <QuestionCard quizQues={quizQues} />
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
