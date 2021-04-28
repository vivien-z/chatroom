import styles from '../styles/Home.module.css';

const ChatroomsList = ({ value, onChange, onSubmit, placeholder }) => {

  return (
    <div>
      <form className={styles.formField} onSubmit={(e) => e.preventDefault() || onSubmit(value)}>
        <label>
          Create a new chatroom:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="chatroom"
          value={value.chatroom}
          onChange={(e) => e.preventDefault() || onChange(e.target.value.chatroom)}
          placeholder={placeholder}
        />
        <input className={styles.formButton} type="submit" value="Add" />
      </form>
      <div className={styles.chatroomList}>
        console.log(value);
        <ul>
          {value.chatrooms.map(( { chatroom }, i) => (
            <li key={i}>
              {chatroom}
            </li>
          ))}
        </ul>
      </div>
    </div>
)};


export default ChatroomsList;
