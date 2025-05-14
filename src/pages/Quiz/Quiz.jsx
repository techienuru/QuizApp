import { useParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./Quiz.module.css";
import { useEffect, useState } from "react";
const Quiz = () => {
  const { noOfQuestion, categoryId, difficulty, questionType } = useParams();
  const [quizQues, setQuizQues] = useState();

  useEffect(() => {
    const categoryParam = categoryId !== "any" ? `&category=${categoryId}` : "";
    const difficultyParam =
      difficulty !== "any" ? `&difficulty=${difficulty}` : "";
    const questionTypeParam =
      questionType !== "any" ? `&type=${questionType}` : "";

    const fetchQuizQues = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${noOfQuestion}${categoryParam}${difficultyParam}${questionTypeParam}`
        );
        const data = await res.json();

        setQuizQues(data.results);

        switch (data.response_code) {
          case 1:
            throw Error(
              `The API doesn't have enough questions for the category you selected!\nPlease reduce the number of Questions you inputed earlier`
            );

          case 2:
            throw Error(
              `You enter the wrong command!\nPlease refill the preference form.`
            );

          case 3:
            throw Error(`Token Not Found Session Token does not exist.`);

          case 4:
            throw Error(
              `Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.`
            );

          case 5:
            throw Error(`Rate Limit Too many requests have occurred.`);

          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuizQues();
  }, []);

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
              {quizQues && <QuestionCard quizQues={quizQues} />}
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
