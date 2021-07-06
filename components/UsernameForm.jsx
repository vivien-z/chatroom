import { useRef } from "react";
import { useUsers } from "../context/UsersProvider";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UsernameForm = ({ value, onChange, disabled, onUsernameSubmit }) => {
  const idRef = useRef()
  const usernameRef = useRef()
  const { createUser } = useUsers()
  // const { createUser, socketNewUser } = useUsers()


  function generateRandomUsername() {
    const rug = require('random-username-generator');
    return (rug.generate());
  }

  function setRandomUsername() {
    onChange(generateRandomUsername())
  }

  function handleSubmit(e) {
    const id = idRef.current.value
    const username = usernameRef.current.value
    e.preventDefault()
    createUser(id, username) //could add 2nd argument(usernameCustomizedRef.current.value)
    // socketNewUser(id, username)
    onUsernameSubmit(() => setUsernameConfirmed(true))
  }

  if (!disabled) {
    return (
      <Container className="d-flex justify-content-center m-5">
        <Form
          className="w-50 p-3 py-5 border"
          onSubmit={ handleSubmit }
          id="new-username"
        >
          <Form.Group>
            <Form.Label>
              Id:
            </Form.Label>
            <Form.Control
              type="text"
              name="user-id"
              ref={idRef}
              required
            />
            <Form.Label>
              Set an username:
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              ref={usernameRef}
              value={value}
              onChange={(e) => e.preventDefault() || onChange(e.target.value)}
              required
            />
          </Form.Group>
          <Button onClick={setRandomUsername} variant="secondary">Random usernames</Button>
          <Button type="submit">Confirm</Button>
        </Form>
      </Container>
    );
  } else {
    return (
      <div></div>
    )
  }

};

export default UsernameForm;

// const UsernameForm = ({ value, onChange, onSubmit }) => {
//   const idRef = useRef()
//   const usernameRef = useRef()
//   const { createUser } = useUsers()

//   function handleSubmit(e) {
//     e.preventDefault()
//     createUser(idRef.current.value, usernameRef.current.value)
//     console.log(idRef.current.value)
//     console.log(usernameRef.current.value)
//     onSubmit(() => setUsernameConfirmed(true))
//     // onSubmit(() => setUsernameConfirmed(true) || onChange(usernameRef.current.value))
//   }

//   function generateRandomUsername() {
//     const rug = require('random-username-generator');
//     return (rug.generate());
//   }

//   function setRandomUsername() {
//     onChange(generateRandomUsername())
//   }

//   return (
//     <Container className="d-flex justify-content-center m-5">
//       <Form
//         className="w-50 p-3 py-5 border"
//         onSubmit={ handleSubmit }
//         id="new-username"
//       >
//         <Form.Group>
//           <Form.Label>
//             Id:
//           </Form.Label>
//           <Form.Control
//             type="text"
//             name="user-id"
//             ref={idRef}
//             required
//           />
//           <Form.Label>
//             Set an username:
//           </Form.Label>
//           <Form.Control
//             type="text"
//             name="username"
//             ref={usernameRef}
//             value={value}
//             onChange={(e) => e.preventDefault() || onChange(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Button onClick={setRandomUsername} variant="secondary">Random usernames</Button>
//         <Button type="submit">Confirm</Button>
//       </Form>
//     </Container>
//   );

// };
