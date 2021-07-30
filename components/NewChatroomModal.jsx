import { useRef, useState, useEffect } from "react";
import { useChatrooms } from "../context/ChatroomsProvider";
import { useUsers } from "../context/UsersProvider";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { io } from "socket.io-client";

export default function NewChatroomModal({ closeModal, myUsername, id }) {
  // const myId = id
  // const myId = users.find(users => user.username === myUsername).id
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
    const otherRoomUsers = selectedUserIds.map(userId => {
      return users.find(user => user.id === userId)
    })
    const roomUsers = [...otherRoomUsers, currentUser]

    createChatroom(roomname, roomUsers)
    closeModal()
  }

  return (
    <div>
      <Modal.Header closeButton>Create a Chatroom</Modal.Header>
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
            <Form.Label>Chatroom name:</Form.Label>
            <Form.Control type="text" ref={roomnameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </div>
  )
};
