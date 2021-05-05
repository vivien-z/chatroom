import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styles from '../styles/MessageInputField.module.css';

const MessageInputField = ({ type, name, value, avatarSrc, onChange, onSubmit, placeholder, disabled }) => {

  if (disabled) {
    return null;
  } else {
    return (
      <div className={styles.messageInput}>
        <Form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          <Form.Group>
            <InputGroup className="w-100">
              <Form.Control
                style={{ height: '75px', resize: 'none' }}
                as="textarea"
                value={value}
                onChange={(e) => e.preventDefault() || onChange(e.target.value)}
                required
              />
              <Button className={styles.messageInputButton} type="submit">Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    );
  }
};

export default MessageInputField;

{/*        <form onSubmit={(e) => e.preventDefault() || onSubmit(e)}>
          <input
            className={styles.messageInputField}
            type={type}
            name={name}
            value={value}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            placeholder={placeholder}
          />
          <input
            className={styles.messageInputButton}
            type="submit"
            value="Submit"
          />
        </form>*/}
