// import styles from '../styles/MessageInputField.module.css';

const MessageInputField = ({ type, name, value, onChange, onSubmit, placeholder, disabled }) => {

  if (disabled) {
    return null;
  } else {
    return (
      <div>
        <form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          <label>
            <input
              type={type}
              name={name}
              value={value}
              onChange={(e) => e.preventDefault() || onChange(e.target.value)}
              placeholder={placeholder}
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
};

export default MessageInputField;
