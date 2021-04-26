import styles from '../styles/MessageHistory.module.css';

const MessageHistory = ({ value }) => {

  return (
    <div>
      {value.map(({ username, message }, i) => (
        <div key={i}>
          <b>{username}</b>: {message}
        </div>
      ))}
    </div>
  );
};

export default MessageHistory;
