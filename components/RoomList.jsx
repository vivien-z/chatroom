import styles from '../styles/RoomList.module.css';

const RoomList = ({ value }) => {

  return (
    <div className={styles.chatroomList}>
    hello
        {console.log("roomlist")}
{/*      <ul>
        {value.map((chatroom, i) => (
          <li key={i}>
            <b>{chatroom}</b>
          </li>
        ))}
      </ul>*/}
    </div>
  )
};

export default RoomList;
