// save for future use, when create private room

import { useRef } from "react";
import { useUsers } from "../context/UsersProvider";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewUserModal = ({ closeModal }) => {
  const usernameRef = useRef()
  // const usernameCustomizedRef = useRef()
  const { createUser } = useUsers()

  function handleSubmit(e) {
    e.preventDefault()

    createUser(usernameRef.current.value) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
  }

  return (
    <div>
      <Modal.Header closeButton>Add a New User</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" ref={usernameRef} required></Form.Control>
          </Form.Group>
{/*          <Form.Group>
            <Form.Label>Customize username:</Form.Label>
            <Form.Control type="text" ref={usernameCustomizedRef}></Form.Control>
          </Form.Group>*/}
          <Button type='submit'>Add</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};

export default NewUserModal;
