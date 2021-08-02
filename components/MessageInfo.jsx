import styles from '../styles/UsernameField.module.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UsernameField = ({ myUsername }) => {

    // if the user has already claimed a username, display it.
    return (
      <div className={styles.userInfo}>
        <h6><b>{myUsername}</b></h6>
        {console.log('userinfo')}
      </div>
    );
  // } else {
  //   // if the user hasn't yet claimed a username, let them do so.
  //   return (
  //     <Container>
  //       <Form.Group
  //         className={styles.formField}
  //         onSubmit={(e) => e.preventDefault() || onSubmit(value)}
  //         id="new-username"
  //         >
  //         <Form.Label>
  //           Set an username:
  //         </Form.Label>
  //         <Form.Control
  //           className={styles.formInput}
  //           type="text"
  //           name="username"
  //           value={value}
  //           onChange={(e) => e.preventDefault() || onChange(e.target.value)}
  //           placeholder={"Set a customized username or pick a random one..."}
  //         />
  //         <Button className={styles.formButton} type="submit">Login</Button>
  //         <Button variant="secondary">I am new</Button>
  //       </Form.Group>
  //     </Container>
  //   );
  // }
};

export default UsernameField;

