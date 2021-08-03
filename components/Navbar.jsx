import styles from '../styles/Navbar.module.scss';

const Navbar = ({ myUsername, avatarSrc, onBtnClick, disabled }) => {

  function confirmLogOut() {
    if (confirm("Are you sure you want to log out?")) {
      onBtnClick(() => setUsernameConfirmed(false))
    }
  }

  const userinfo = (
    <div className={styles.navbarUserInfo}>
      <span>Hi: {myUsername}</span>

      <button
        className={`ms-2 ${styles.navbarBtn}`}
        onClick={(e) =>  e.preventDefault() || confirmLogOut()}
      >
        x
      </button>

    </div>
  )

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>A Chatroom</div>
      {disabled ? null : userinfo}
    </nav>
  )
};

export default Navbar;
