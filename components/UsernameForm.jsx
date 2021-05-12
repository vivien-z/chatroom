import { useRef } from "react";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UsernameForm = ({ value, onChange, onSubmit }) => {

  const usernameRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(() => setUsernameConfirmed(true) || onChange(usernameRef.current.value))
  }

  function generateRandomUsername() {
    const rug = require('random-username-generator');
    return (rug.generate());
  }

  function setRandomUsername() {
    onChange(generateRandomUsername())
  }

  return (
    <Container className="d-flex justify-content-center m-5">
      <Form
        className="w-50 p-3 py-5 border"
        onSubmit={ handleSubmit }
        id="new-username"
      >
        <Form.Group>
          <Form.Label>
            Set an username:
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={value}
            ref={usernameRef}
            onChange={(e) => e.preventDefault() || onChange(e.target.value)}
            required
          />
        </Form.Group>
        <Button onClick={setRandomUsername} variant="secondary">Random usernames</Button>
        <Button type="submit">Confirm</Button>
      </Form>
    </Container>
  );

};

export default UsernameForm;
