import { useEffect, useState } from "react";
import styles from "./QuestionCard.module.css";
import { useNavigate } from "react-router-dom";
import useGetHint from "../../hooks/useGetHint";
import useTranslate from "../../hooks/useTranslate";

const QuestionCard = ({
  quizQues,
  handleNextQuestion,
  allQuizQues,
  setQuizQues,
}) => {
  const navigate = useNavigate();
  const { currentQuesNo, totalQuesNo, question, options, correctAnswer } =
    quizQues;

  const [scores, setScores] = useState({
    answered: 0,
    correct: 0,
    wrong: 0,
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLastQues, setIsLastQues] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [srcLang, setSrcLang] = useState("en_XX");
  const [tgtLang, setTgtLang] = useState("en_XX");

  const { isHintLoading, hintData, setHintData, getHint } = useGetHint();
  const { translateBatch, mbart50Languages, isLangLoading } = useTranslate();

  useEffect(() => {
    if (srcLang === "en_XX" && tgtLang === "en_XX") return;

    const loadTranslation = async () => {
      const translatedQues = await translateBatch(
        allQuizQues,
        quizQues,
        srcLang,
        tgtLang
      );
      setQuizQues(translatedQues);
    };
    loadTranslation();
  }, [tgtLang]);

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
        wrong: prev.wrong,
      }));
      setAnswerFeedback({
        firstFeedback: "correct",
        secondFeedback: correctAnswer,
      });
    } else {
      setScores((prev) => {
        return {
          answered: prev.answered + 1,
          correct: prev.correct,
          wrong: prev.wrong + 1,
        };
      });
      setAnswerFeedback({
        firstFeedback: "wrong",
        secondFeedback: correctAnswer,
      });
    }
  };

  const handleEndQuiz = () => {
    navigate("/result", {
      state: {
        ...scores,
        totalQues: totalQuesNo,
      },
    });
  };

  return (
    <>
      <div className={`card ${styles.questionCard}`}>
        <div className={`card-title ${styles.questionCardTitle}`}>
          <div className="d-flex justify-content-between align-items-center p-3">
            <p className={`${styles.questionNo}`}>
              Question: {currentQuesNo}/{totalQuesNo}
            </p>
            <div className={`${styles.scoreProgress}`}>
              Score:{" "}
              {`${((scores.correct * 100) / totalQuesNo).toFixed(2) || 0}%`}
            </div>
            <div>
              <button
                className={`btn ${styles.getHintBtn}`}
                onClick={() => {
                  getHint(question, options, correctAnswer);
                }}
                disabled={isHintLoading}
              >
                {isHintLoading ? "Loading..." : "Get Hint"}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <select
              className="form-control w-50"
              id="lang-list"
              value={tgtLang}
              onChange={(e) => {
                setSrcLang(tgtLang);
                setTgtLang(e.target.value);
              }}
            >
              {mbart50Languages.map((l) => (
                <option value={l.code} key={l.code}>
                  {l.language}
                </option>
              ))}
            </select>
            <p>{isLangLoading && "Loading..."}</p>
          </div>
        </div>
        <div className={`card-body ${styles.questionCardBody}`}>
          <form>
            <label htmlFor="" className={`${styles.question}`}>
              <span>Q: </span>
              {question}?
            </label>
            {hintData && (
              <article className={`${styles.hintBox}`}>{hintData}</article>
            )}
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
                setHintData(null);
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
