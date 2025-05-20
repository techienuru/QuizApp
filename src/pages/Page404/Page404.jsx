import { Link } from "react-router-dom";
import styles from "./Page404.module.css";
const Page404 = () => {
  return (
    <>
      <main className={styles.page404}>
        <div className={`container ${styles.noPageContainer}`}>
          <div className="d-flex justify-content-center align-items-center flex-column py-5">
            <section className={`${styles.scoresBreakdownSection}`}>
              <div className="container text-center">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Looks like the page you are looking for doesn't exist.</p>
              </div>
            </section>

            <div className="d-flex justify-content-center mt-3">
              <Link
                to="/"
                className={`btn btn-outline-primary ${styles.goHomeBtn}`}
              >
                Go Home
              </Link>
            </div>

            <section className="">
              <img
                src="../404-image.png"
                alt="Clueless individual"
                className="img-fluid"
              />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page404;
