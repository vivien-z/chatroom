import styles from '../styles/UsernameField.module.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const UsernameField = ({ value, avatarSrc, onChange, onSubmit, completed, placeholder }) => {
  if (completed) {
    // if the user has already claimed a username, display it.
    return (
      <div className={styles.userInfo}>
        <h4><b>{value}</b></h4>
        <img src={avatarSrc} alt="profile pic" />
      </div>
    );
  } else {
    // if the user hasn't yet claimed a username, let them do so.
    return (
      <Container>
        <Form.Group
          className={styles.formField}
          onSubmit={(e) => e.preventDefault() || onSubmit(value)}
          id="new-username"
          >
          <Form.Label>
            Set an username:
          </Form.Label>
          <Form.Control
            className={styles.formInput}
            type="text"
            name="username"
            value={value}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            placeholder={placeholder}
          />
          <Form.Control className={styles.formButton} type="submit" value="Start Chatting" />
        </Form.Group>
      </Container>
    );
  }
};

export default UsernameField;
