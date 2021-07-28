import styles from '../styles/Navbar.module.scss';

const Navbar = ({ value, avatarSrc, disabled }) => {

  const userinfo =(
    <div className={styles.navbarUserInfo}>
      <p>Welcome {value}</p>
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
