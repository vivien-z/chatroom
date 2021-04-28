import styles from '../styles/ChatroomsList.module.css';

const ChatroomsList = ({ value, onChange, onSubmit, placeholder }) => {

  return (
    <div className={styles.chatroomForm}>
      <form  onSubmit={(e) => e.preventDefault() || onSubmit(value)}>
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
        console.log({value.chatrooms});
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
