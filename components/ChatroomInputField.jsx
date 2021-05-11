

const ChatroomInputField = ({ type, name, value, onChange, onSubmit, disabled }) => {
  if (disabled) {
    return null;
  } else {
    return (
      <div>
        <form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
          />
          {/*{<input type="submit" value="Add"/>}*/}
        </form>
      </div>
    );
  }
};

export default ChatroomInputField;
