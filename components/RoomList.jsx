import styles from '../styles/RoomList.module.css';

const RoomList = ({ value }) => {

console.log(value)
  return (
    <div className={styles.chatroomList}>
      <ul>
        {value.map((chatroom, i) => (
          <li key={i}>
            <b>{chatroom}</b>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default RoomList;
