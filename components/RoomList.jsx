import styles from '../styles/RoomList.module.css';

const RoomList = ({ value }) => {

  return (
    <div className={styles.chatroomList}>
      <ul>
        {value.map(({ chatroom }, i) => (
          <li key={i}>
            chatroom
          </li>
        ))}
      </ul>
    </div>
  )
};

export default RoomList;

    // <div className={styles.chatroomForm}>
    //   <form  onSubmit={(e) => e.preventDefault() || onSubmit(value)}>
    //     <label>
    //       Create a new chatroom:
    //     </label>
    //     <input
    //       className={styles.formInput}
    //       type="text"
    //       name="chatroom"
    //       value={value}
    //       onChange={(e) => e.preventDefault() || onChange(e.target.value)}
    //       placeholder={placeholder}
    //     />
    //     <input className={styles.formButton} type="submit" value="Add" />
    //   </form>
    // </div>
