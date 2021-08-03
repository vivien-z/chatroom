import { useRef } from "react";
import { useUsers } from "../context/UsersProvider";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/Modal.module.scss';

const NewUserModal = ({ closeModal }) => {
  const idRef = useRef()
  const usernameRef = useRef()
  const { createUser } = useUsers()

  function handleSubmit(e) {
    e.preventDefault()

    createUser(idRef.current.value, usernameRef.current.value) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
  }

  return (
    <div>
      <Modal.Header className={styles.closeBtn} closeButton>Add a New User</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" ref={usernameRef} required></Form.Control>
          </Form.Group>
          <Button className="mt-2" type='submit'>Add</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};

export default NewUserModal;
