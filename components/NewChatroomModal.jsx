import { useRef } from "react";
import { useChatrooms } from "../context/ChatroomsProvider";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewChatroomModal = ({ closeModal }) => {
  const roomnameRef = useRef()
  const { createChatroom } = useChatrooms()

  function handleSubmit(e) {
    e.preventDefault()

    createChatroom(roomnameRef.current.value) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
  }

  return (
    <div>
      <Modal.Header closeButton>Create a Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Chatroom name:</Form.Label>
            <Form.Control type="text" ref={roomnameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>New Chatroom</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};

export default NewChatroomModal;
