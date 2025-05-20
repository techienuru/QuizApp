import { useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import styles from "./Quiz.module.css";
import { useEffect, useState } from "react";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const noOfQuestion = searchParams.get("noOfQuestion");
  const categoryId = searchParams.get("categoryId");
  const difficulty = searchParams.get("difficulty");
  const questionType = searchParams.get("questionType");

  const [allQuizQues, setAllQuizQues] = useState();
  const [quizQues, setQuizQues] = useState();
  const [isQuesLoading, setIsQuesLoading] = useState(true);
  const [quesIndex, setQuesIndex] = useState(0);

  useEffect(() => {
    const categoryParam = categoryId ? `&category=${categoryId}` : "";
    const difficultyParam = difficulty ? `&difficulty=${difficulty}` : "";
    const questionTypeParam = questionType ? `&type=${questionType}` : "";

    const fetchQuizQues = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${noOfQuestion}${categoryParam}${difficultyParam}${questionTypeParam}`
        );
        const data = await res.json();

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

        setAllQuizQues(data.results);
        const singleQues = getSingleQues(data.results);
        setQuizQues(singleQues);
        setIsQuesLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuizQues();
  }, [noOfQuestion, categoryId, difficulty, questionType]);

  const getSingleQues = (allQuestions) => {
    const quizQuesObj = allQuestions[quesIndex];
    const currentQuesNo = quesIndex + 1;
    const totalQuesNo = allQuestions.length;

    // Destructure the options from the Object &
    // Sort them in a random order
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer
    } = quizQuesObj;
    const quizQuesOptions = [...incorrectAnswers, correctAnswer];
    quizQuesOptions.sort(() => Math.random() - 0.5);

    const singleQues = {
      currentQuesNo,
      totalQuesNo,
      question: quizQuesObj.question,
      options: quizQuesOptions,
      category: quizQuesObj.category,
      difficulty: quizQuesObj.difficulty,
      type: quizQuesObj.type === "multiple" ? "Multiple Choice" : "True/False",
      correctAnswer: quizQuesObj.correct_answer
    };

    return singleQues;
  };

  useEffect(() => {
    if (allQuizQues && allQuizQues.length > 0) {
      const singleQues = getSingleQues(allQuizQues);
      setQuizQues(singleQues);
      setIsQuesLoading(false);
    }
  }, [quesIndex]);

  const handleNextQuestion = () => {
    setQuesIndex((prev) => prev + 1);
  };

  return (
    <>
      <main className={`${styles.quiz}`}>
        <div className="container py-3">
          <section className={`mb-3 ${styles.heading}`}>
            <div className="d-flex justify-content-center">
              <div className={`text-center`}>
                <p>
                  {quizQues?.category || "Category Name"}{" "}
                  <span>({quizQues?.difficulty || "Difficulty"})</span>
                </p>
                <p>{quizQues?.type || "Question Type"}</p>
              </div>
            </div>
          </section>

          <section className={`${styles.questionCardSection}`}>
            <div className="container p-0">
              {isQuesLoading ? (
                "Question is Loading..."
              ) : (
                <QuestionCard
                  quizQues={quizQues}
                  handleNextQuestion={handleNextQuestion}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Quiz;
