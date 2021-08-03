import { useRef } from "react";
import { useUsers } from "../context/UsersProvider";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/Button';
import styles from '../styles/LoginForm.module.scss';

const LoginForm = ({ value, onChange, onUsernameSubmit, onIdSubmit }) => {
  const idRef = useRef()
  const usernameRef = useRef()
  const { users, createUser } = useUsers()

  function generateRandomUsername() {
    const rug = require('random-username-generator');
    return (rug.generate());
  }

  function setRandomUsername() {
    onChange(generateRandomUsername())
  }

  function isNewRoomuser(username) {
    let count = 0
    for (let i = 0; i < users.length; i++) {
      if (users[i].username !== username) {
        count ++
      }
    }
    if (users.length === count || users.length === 0) {
      return true
    } else {
      return false
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const username = usernameRef.current.value
    let id

    if (isNewRoomuser(username)) {
      id = idRef.current.value
      createUser(id, username)
    } else {
      id = users.find(user => user.username === username).id
      onChange(username)
    }
    onIdSubmit(id)
    onUsernameSubmit(() => setUsernameConfirmed(true))
  }

  return (
    <Container className="d-flex justify-content-center my-5">
      <Form
        className={`${styles.form} w-50 border bg-white rounded`}
        onSubmit={ handleSubmit }
        id="new-username"
      >
        <div className={styles.formTitle}>Chat Community</div>
        <div className="p-4">
          <Form.Group>
            <Form.Label><strong>Id</strong></Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              name="user-id"
              ref={idRef}
              required
            />
            <Form.Label><strong>Username</strong></Form.Label>
            <div className="input-group mb-3">
              <Form.Control
                type="text"
                name="username"
                ref={usernameRef}
                value={value}
                onChange={(e) => e.preventDefault() || onChange(e.target.value)}
                required
              />
              <Button onClick={setRandomUsername} variant="secondary">Random usernames</Button>
            </div>
          </Form.Group>
          <Button className="btn btn-primary mt-1" type="submit">Login</Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
