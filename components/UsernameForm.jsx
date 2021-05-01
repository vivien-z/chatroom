import { useRef } from "react";
import styles from '../styles/UsernameField.module.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UsernameForm = ({ value, avatarSrc, onChange, onSubmit }) => {

  const usernameRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onChange(usernameRef.current.value)
  }

  function generateRandomUsername() {
    const rug = require('random-username-generator');
    return (rug.generate());
  }

  function setRandomUsername() {
    onChange(generateRandomUsername())
  }

  return (
    <Container>
      <Form
        className={styles.formField}
        onSubmit={ handleSubmit }
        id="new-username"
      >
        <Form.Group>
          <Form.Label>
            Set an username:
          </Form.Label>
          <Form.Control
            className={styles.formInput}
            type="text"
            name="username"
            value={value}
            ref={usernameRef}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            placeholder={"Set a customized username or pick a random one..."}
            required
          />
        </Form.Group>
        <Button className={styles.formButton} type="submit">Use Customized</Button>
        <Button onClick={setRandomUsername} variant="secondary">Use random</Button>
      </Form>
    </Container>
  );

};

export default UsernameForm;
