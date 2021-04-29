import styles from '../styles/MessageInputField.module.css';

const MessageInputField = ({ type, name, value, avatarSrc, onChange, onSubmit, placeholder, disabled }) => {

  if (disabled) {
    return null;
  } else {
    return (
      <div className={styles.messageInput}>
        <form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          <input
            className={styles.messageInputField}
            type={type}
            name={name}
            value={value}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            placeholder={placeholder}
          />
          <input
            className={styles.messageInputButton}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
};

export default MessageInputField;
