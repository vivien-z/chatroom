import { useUsers } from "../context/UsersProvider";
import ListGroup from 'react-bootstrap/ListGroup';

// import styles from '../styles/RoomList.module.css';

const Users = ({ value }) => {
  const { users } = useUsers()
  console.log('users list')

  return (
    <ListGroup variant="flush">

        {users.map((user, i) => (
          <ListGroup.Item key={i}>
            {user.username}
          </ListGroup.Item>
        ))}

    </ListGroup>
  )
};

export default Users;
