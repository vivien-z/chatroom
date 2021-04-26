import styles from '../styles/UsernameField.module.css';

const UsernameField = ({ value, onChange, onSubmit, completed, placeholder }) => {
  if (completed) {
    // if the user has already claimed a username, display it.
    return (
      <div>
        <h3>Chatting as <b>{value}</b></h3>
      </div>
    );
  } else {
    // if the user hasn't yet claimed a username, let them do so.
    return (
      <div className={styles.formField} >
        <form onSubmit={(e) => e.preventDefault() || onSubmit(value)}>
          <label>
            Set your username:
            <input
              type="text"
              name="username"
              value={value}
              onChange={(e) => e.preventDefault() || onChange(e.target.value)}
              placeholder={placeholder}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default UsernameField;