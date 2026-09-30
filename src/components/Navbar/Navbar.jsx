import styles from "./Navbar.module.css";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Two ways to play", href: "#two-ways" },
  { label: "Why you'll like it", href: "#why" },
];

const Navbar = ({ onPlayNow }) => {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.navInner}`}>
        <span className={styles.brand}>QuizBee</span>

        <nav className={styles.navLinks}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`btn ${styles.playBtn}`}
          onClick={onPlayNow}
        >
          Play Now
        </button>
      </div>
    </header>
  );
};

export default Navbar;
