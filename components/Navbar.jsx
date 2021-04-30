import styles from '../styles/Navbar.module.css';

const Navbar = ({ value, avatarSrc, disabled }) => {

  if (disabled) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>2chat</div>
      </nav>
    );
  } else {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>2chat</div>
        <div className={styles.navbarProfileInfo}>
          <p>Hi: {value}</p>
          {/*<img src={avatarSrc} alt="profile pic" />*/}
        </div>
      </nav>
    );
  }
};

export default Navbar;
