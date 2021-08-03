import { useUsers } from "../context/UsersProvider";
import ListGroup from 'react-bootstrap/ListGroup';

const Users = ({ value }) => {
  const { users } = useUsers()

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
