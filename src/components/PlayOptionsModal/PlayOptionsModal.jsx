import { useEffect, useState } from "react";
import styles from "./PlayOptionsModal.module.css";

const PlayOptionsModal = ({ closeModal }) => {
  const [categoryId, setCategoryId] = useState(undefined);
  const [maxQuestion, setMaxQuestion] = useState(50);
  const [noOfQuestion, setNoOfQuestion] = useState(10);
  const [difficulty, setDifficulty] = useState("any");
  const [questionType, setQuestionType] = useState("any");

  useEffect(() => {
    const fetchMaxQuestion = async () => {
      const res = await fetch(
        `https://opentdb.com/api_count.php?category=${categoryId}`
      );
      const data = await res.json();
      const totalQuestion = data.category_question_count.total_question_count;
      setMaxQuestion(totalQuestion);
    };
    console.log("Use Effect runs!");
    if (categoryId) {
      fetchMaxQuestion();
    }
  }, [categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/quiz/${noOfQuestion}/${categoryId}/${difficulty}/${questionType}`;
  };

  return (
    <>
      <section className={`${styles.playOptionsModal}`}>
        <div className={`container w-auto p-3 ${styles.modalContent}`}>
          <div
            className={`d-flex justify-content-between border-bottom my-3 p-3 ${styles.modalHeader}`}
          >
            <h2 className={`${styles.modalTitle}`}>Play Options</h2>
            <button
              type="button"
              className={`btn btn-close ${styles.closeBtn}`}
              onClick={closeModal}
            ></button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`mb-3 ${styles.formItem}`}>
              <label className={`form-label`}>Category</label>
              <select
                name="category"
                id="category"
                value={categoryId}
                className={`form-select`}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
                required
              >
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">
                  Entertainment: Japanese Anime & Manga
                </option>
                <option value="32">Entertainment: Cartoon & Animations</option>
              </select>
            </div>
            <div className={`mb-3 ${styles.formItem}`}>
              <label className={`form-label`}>Number of Questions</label>
              <input
                type="number"
                id="numberOfQuestions"
                className={`form-control`}
                min="1"
                max="50"
                defaultValue={noOfQuestion}
                onChange={(e) => {
                  setNoOfQuestion(e.target.value);
                }}
                required
              />
              <span className="form-text text-warning">
                Min: 1, Max:50 out of {maxQuestion}
              </span>
            </div>
            <div className={`mb-3 ${styles.formItem}`}>
              <label>Difficulty</label>
              <select
                name="difficulty"
                id="difficulty"
                className={`form-select`}
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                }}
                required
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className={`mb-3 ${styles.formItem}`}>
              <label>Type</label>
              <select
                name="type"
                id="type"
                className={`form-select`}
                value={questionType}
                onChange={(e) => {
                  setQuestionType(e.target.value);
                }}
                required
              >
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
            <button type="submit" className={`btn w-100 ${styles.playBtn}`}>
              Get Started
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default PlayOptionsModal;
