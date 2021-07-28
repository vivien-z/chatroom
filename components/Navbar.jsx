import styles from '../styles/Navbar.module.scss';

const Navbar = ({ value, avatarSrc, disabled }) => {

  const userinfo =(
    <div className={styles.navbarUserInfo}>
      <span>user: {value}</span>
      {/*<span className={`${styles.avatar}`}>{value[0].toUpperCase()}</span>*/}
      {/*<img src={avatarSrc} alt="profile pic" />*/}
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
