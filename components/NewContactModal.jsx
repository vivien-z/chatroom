import { useRef } from "react";
import { useContacts } from "../context/ContactsProvider";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewContactModal = ({ closeModal }) => {
  const usernameRef = useRef()
  // const usernameCustomizedRef = useRef()
  const { createContact } = useContacts()

  function handleSubmit(e) {
    e.preventDefault()

    createContact(usernameRef.current.value) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
  }

  return (
    <div>
      <Modal.Header closeButton>New Contact</Modal.Header>
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
          <Button type='submit'>Add Contact</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};

export default NewContactModal;
