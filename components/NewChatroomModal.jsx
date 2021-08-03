import { useRef, useState, useEffect } from "react";
import { useChatrooms } from "../context/ChatroomsProvider";
import { useUsers } from "../context/UsersProvider";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/Modal.module.scss';

export default function NewChatroomModal({ closeModal, myUsername, myId }) {
  const { users } = useUsers()
  const roomnameRef = useRef()
  const { createChatroom } = useChatrooms()
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [chatroom, setChatroom] = useState("");
  const [chatrooms, setChatrooms] = useState([]);

  const otherUsers = users.filter(user => user.username !== myUsername)
  const currentUser = users.find(user => user.username === myUsername)

  function handleCheckboxChange(userId) {
    setSelectedUserIds(prevSelectedUserIds => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter(prevId => {
          return prevId !== userId
        })
      } else {
        return [...prevSelectedUserIds, userId]
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const roomname = roomnameRef.current.value
    const otherRoomUsers = selectedUserIds.map(sId => {
      return users.find(user => user.id === sId)
    })
    const roomUsers = [...otherRoomUsers, currentUser]

    createChatroom(roomname, roomUsers)
    closeModal()
  }

  return (
    <div>
      <Modal.Header className={styles.closeBtn} closeButton>Create a Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {users.map(user => (
            <Form.Group controlId={user.id} key={user.id}>
              <Form.Check
                type="checkbox"
                value={selectedUserIds.includes(user.id)}
                label={user.username}
                onChange={() => handleCheckboxChange(user.id)}
              />

            </Form.Group>
          ))}
          <Form.Group>
            <Form.Label className="mt-2">Chatroom name:</Form.Label>
            <Form.Control type="text" ref={roomnameRef} required></Form.Control>
          </Form.Group>
          <Button className="mt-2" type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};
