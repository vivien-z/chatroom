import styles from '../styles/UsernameField.module.css';

const UsernameField = ({ value, avatarSrc, onChange, onSubmit, completed, placeholder }) => {
  if (completed) {
    // if the user has already claimed a username, display it.
    return (
      <div className={styles.userInfo}>
        <h3>Chatting as <b>{value}</b></h3>
        <img src={avatarSrc} alt="profile pic" />
      </div>
    );
  } else {
    // if the user hasn't yet claimed a username, let them do so.
    return (
      <form className={styles.formField} onSubmit={(e) => e.preventDefault() || onSubmit(value)}>
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

export default UsernameField;
