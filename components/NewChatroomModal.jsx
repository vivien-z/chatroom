import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const NewChatroomModal = ({ closeModal }) => {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div>
      <Modal.Header closeButton>Create Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Chatroom name:</Form.Label>
            <Form.Control></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
    </div>
  )
};

export default NewChatroomModal;
