import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";
import styles from '../styles/MessageHistory.module.css';

// const MessageHistory = ({ value, selectedChatroom }) => {
const MessageHistory = () => {

  const { selectedChatroom } = useChatrooms()

  return (
    <div className={styles.messageHistory}>
{/*      {selectedChatroom.map(({ username, message }, i) => (
        <div key={i}>
          <b>{username}</b>: {message}
        </div>
      ))}*/}
      chat history
    </div>
  );
};

export default MessageHistory;
