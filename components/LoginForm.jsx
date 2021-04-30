// import styles from '../styles/LoginForm.module.css';


const LoginForm = ({ value, avatarSrc, onChange, onSubmit, completed, placeholder }) => {
  if (completed) {
    return (
      <div className={styles.userInfo}>
        <h4><b>{value}</b></h4>
        <img src={avatarSrc} alt="profile pic" />
      </div>
    );
  } else {
    return (
      <form
        className={styles.formField}
        onSubmit={(e) => e.preventDefault() || onSubmit(value)}
        id="new-username"
        >
        <label>
          Set an username:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="username"
          value={value}
          onChange={(e) => e.preventDefault() || onChange(e.target.value)}
          placeholder={placeholder}
        />
        <input className={styles.formButton} type="submit" value="Start Chatting" />
      </form>
    );
  }
};

export default LoginForm;
