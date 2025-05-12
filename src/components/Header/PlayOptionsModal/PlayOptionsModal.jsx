import styles from "./PlayOptionsModal.module.css";

const PlayOptionsModal = () => {
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
            ></button>
          </div>
          <form className={styles.form}>
            <div className={`mb-3 ${styles.formItem}`}>
              <label className={`form-label`}>Category</label>
              <select name="category" id="category" className={`form-select`}>
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="13">Entertainment: Television</option>
                <option value="14">Entertainment: Video Games</option>
                <option value="15">Entertainment: Board Games</option>
                <option value="16">Science & Nature</option>
                <option value="17">Science: Computers</option>
                <option value="18">Science: Mathematics</option>
                <option value="18">Mythology</option>
                <option value="18">Sports</option>
                <option value="18">Geography</option>
                <option value="18">History</option>
                <option value="18">Politics</option>
                <option value="18">Art</option>
                <option value="18">Celebrities</option>
                <option value="18">Animals</option>
                <option value="18">Vehicles</option>
                <option value="15">Entertainment: Comics</option>
                <option value="19">Science: Gadgets</option>
                <option value="15">
                  Entertainment: Japanese Anime & Manga
                </option>
                <option value="15">Entertainment: Cartoon & Animations</option>
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
                defaultValue="10"
              />
              <span className="form-text">Min: 1, Max:50</span>
            </div>
            <div className={`mb-3 ${styles.formItem}`}>
              <label>Difficulty</label>
              <select
                name="difficulty"
                id="difficulty"
                className={`form-select`}
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className={`mb-3 ${styles.formItem}`}>
              <label>Type</label>
              <select name="type" id="type" className={`form-select`}>
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
