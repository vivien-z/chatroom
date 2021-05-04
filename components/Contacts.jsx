import { useContacts } from "../context/ContactsProvider";
import ListGroup from 'react-bootstrap/ListGroup';

// import styles from '../styles/RoomList.module.css';

const Contacts = ({ value }) => {
  const { contacts } = useContacts()

  return (
    <ListGroup variant="flush">

        {contacts.map((contact, i) => (
          <ListGroup.Item key={i}>
            <b>{contact.username}</b>
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
};

export default Contacts;
