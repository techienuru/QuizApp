import { useEffect, useState } from "react";
import styles from "./QuestionCard.module.css";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ quizQues, handleNextQuestion }) => {
  const navigate = useNavigate();
  const { currentQuesNo, totalQuesNo, question, options, correctAnswer } =
    quizQues;

  const [scores, setScores] = useState({
    answered: 0,
    correct: 0,
    wrong: 0
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLastQues, setIsLastQues] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  useEffect(() => {
    if (currentQuesNo === totalQuesNo) {
      setIsLastQues(true);
    }
  }, [currentQuesNo, totalQuesNo]);

  const handleOptionSelect = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScores((prev) => ({
        answered: prev.answered + 1,
        correct: prev.correct + 1,
        wrong: prev.wrong
      }));
      setAnswerFeedback({
        firstFeedback: "correct",
        secondFeedback: correctAnswer
      });
    } else {
      setScores((prev) => {
        return {
          answered: prev.answered + 1,
          correct: prev.correct,
          wrong: prev.wrong + 1
        };
      });
      setAnswerFeedback({
        firstFeedback: "wrong",
        secondFeedback: correctAnswer
      });
    }
  };

  const handleEndQuiz = () => {
    navigate("/result", {
      state: {
        ...scores,
        totalQues: totalQuesNo
      }
    });
  };

  console.log("Your scores is: ", scores);

  return (
    <>
      <div className={`card ${styles.questionCard}`}>
        <div className={`card-title ${styles.questionCardTitle}`}>
          <div className="d-flex justify-content-between align-items-center p-3">
            <p className={`${styles.questionNo}`}>
              Question: {currentQuesNo}/{totalQuesNo}
            </p>
            <p className={`${styles.timeRemaining}`}>00:00</p>
            <div className={`${styles.scoreProgress}`}>
              <div
                className={`${styles.scoreProgressBar}`}
                style={{
                  width: `${(scores.correct * 100) / totalQuesNo || 0}%`,
                  height: "30px"
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className={`card-body ${styles.questionCardBody}`}>
          <form>
            <label htmlFor="" className={`${styles.question}`}>
              <span>Q: </span>
              {question}?
            </label>
            <article className={`${styles.options}`}>
              {options.map((option, index) => (
                <div className={`form-check ${styles.formCheck}`} key={index}>
                  <input
                    type="radio"
                    name={`question${currentQuesNo}`}
                    id={`option${index}`}
                    className={`form-check-input`}
                    value={option}
                    onChange={(e) => {
                      handleOptionSelect(e.target.value);
                    }}
                  />
                  <label htmlFor="question1" className="form-check-label">
                    {option}
                  </label>
                </div>
              ))}
            </article>
            {answerFeedback && (
              <article className={`${styles.answerFeedback}`}>
                <div className="d-flex justify-content-center">
                  <div>
                    <p>You are {answerFeedback.firstFeedback}!</p>
                    <p>
                      The correct Answer is:{" "}
                      <span className="fw-bold" style={{ fontStyle: "italic" }}>
                        {answerFeedback.secondFeedback}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            )}
          </form>
        </div>
      </div>

      <div className={`mt-3 ${styles.progressBtns}`}>
        <div className="d-flex justify-content-end gap-3">
          {selectedOption && !isAnswered && (
            <button
              type="button"
              className={`btn ${styles.submitBtn}`}
              onClick={() => {
                handleSubmit(selectedOption);
                setIsAnswered(true);
              }}
            >
              Submit
            </button>
          )}
          {isAnswered && !isLastQues && (
            <button
              type="button"
              className={`btn ${styles.nextBtn}`}
              onClick={() => {
                handleNextQuestion();
                setSelectedOption("");
                setIsAnswered(false);
                setAnswerFeedback(null);
              }}
            >
              Next
            </button>
          )}

          {isAnswered && isLastQues && (
            <button
              type="button"
              className={`btn ${styles.endQuizBtn}`}
              onClick={() => {
                handleEndQuiz();
              }}
            >
              End Quiz
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
