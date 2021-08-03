import { useState } from "react";
import ReactDOM from 'react-dom';
import Chatrooms from "../components/Chatrooms";
import Users from "../components/Users";
import NewChatroomModal from "../components/NewChatroomModal";
import NewUserModal from "../components/NewUserModal";

import styles from '../styles/ChatWindowSidebar.module.scss';
import { Tab, Nav, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faUserFriends } from '@fortawesome/free-solid-svg-icons'

const CHATROOMS_KEY = "chatrooms"
const USERS_KEY = "users"

const ChatWindowSidebar = ({ myUsername, myId }) => {
  const [activeKey, setActiveKey] = useState(CHATROOMS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const btnName = activeKey === CHATROOMS_KEY ? "Chatroom" : "Contact"
  const chatrooms = <FontAwesomeIcon icon={faComments} />
  const contacts = <FontAwesomeIcon icon={faUserFriends} />

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '260px'}} className='d-flex flex-column h-100'>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Row className={`h-100 ${styles.margin0}`}>
          <Col sm={3} className={`${styles.navTab} px-0 h-100 py-1`}>
            <div className="py-1 bg-primary h-100 rounded">
              <span className={`${styles.avatar}`}>{myUsername[0].toUpperCase()}</span>

              <Nav variant="pills" className="pt-4 justify-content-center align-items-start">
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey={CHATROOMS_KEY}>{chatrooms}</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link eventKey={USERS_KEY}>{contacts}</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col sm={9} className="px-0 h-100">
            <div className='d-flex flex-column py-1 h-100'>
              <p className={`${styles.tabTitle}`}>{btnName}</p>
              <Tab.Content className='overflow-auto flex-grow-1'>
                <Tab.Pane eventKey={CHATROOMS_KEY}>
                  <Chatrooms myUsername={myUsername} />
                </Tab.Pane>
                <Tab.Pane eventKey={USERS_KEY}>
                  <Users />
                </Tab.Pane>
              </Tab.Content>
              <Button
                className={`${styles.buttom} align-items-end w-100`}
                onClick={()=>setModalOpen(true)}
              >
                New {btnName}
              </Button>
            </div>
          </Col>
        </Row>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "chatrooms" ?
          <NewChatroomModal closeModal={closeModal} myUsername={myUsername} myId={myId}/> :
          <NewUserModal closeModal={closeModal} />
        }
      </Modal>

    </div>
  )
}

export default ChatWindowSidebar;
