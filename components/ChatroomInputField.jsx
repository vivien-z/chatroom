import styles from '../styles/ChatroomInputField.module.css';

const ChatroomInputField = ({ type, name, value, onChange, onSubmit, disabled }) => {

  if (disabled) {
    return null;
  } else {
    return (
      <div className={styles.chatroomForm}>
        <form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          {/*<label>*/}
            <input
              className={styles.chatroomInputField}
              type={type}
              name={name}
              value={value}
              onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            />
          {/*</label>*/}
          {<input type="submit" value="Submit"/>}
        </form>
      </div>
    );
  }
};

export default ChatroomInputField;
