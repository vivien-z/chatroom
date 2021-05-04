import { useUsers } from "../context/UsersProvider";
import ListGroup from 'react-bootstrap/ListGroup';

// import styles from '../styles/RoomList.module.css';

const Users = ({ value }) => {
  const { users } = useUsers()

  return (
    <ListGroup variant="flush">

        {users.map((user, i) => (
          <ListGroup.Item key={i}>
            <b>{user.username}</b>
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
};

export default Users;
