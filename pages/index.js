import Head from 'next/head';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import ChatWindow from "../components/ChatWindow";
import useLocalStorage from '../hooks/useLocalStorage';
import { UsersProvider } from "../context/UsersProvider";
import { ChatroomsProvider } from "../context/ChatroomsProvider";
import { SocketProvider } from "../context/SocketProvider";

import Chatrooms from "../components/Chatrooms";
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  const [myUsername, setMyUsername] = useLocalStorage('my-username');
  const [myId, setMyId] = useLocalStorage('my-id');
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

  const navbar = (
    <Navbar
      myUsername={myUsername || null}
      avatarSrc="/favicon.ico"
      onBtnClick={() => setUsernameConfirmed()}
      disabled={!isUsernameConfirmed}
    />
  )
  const chatWindow = <ChatWindow myUsername={myUsername} myId={myId}/>
  const loginForm = (
    <LoginForm
      value={myUsername}
      onChange={(value) => setMyUsername(value)}
      onUsernameSubmit={() => setUsernameConfirmed(true)}
      onIdSubmit={setMyId}
    />
  )

  return (
    <>
      <Head>
        <title>A Chatroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className="d-flex flex-column vh-100">
        <Row>{navbar}</Row>
        <Row className="flex-grow-1 overflow-auto">
          <SocketProvider className='mt-5' myUsername={myUsername} myId={myId}>
            <UsersProvider myUsername={myUsername} myId={myId}>
              <ChatroomsProvider myUsername={myUsername} myId={myId}>
                {isUsernameConfirmed ? chatWindow : <></>}
                {isUsernameConfirmed ? <></> : loginForm}
              </ChatroomsProvider>
            </UsersProvider>
          </SocketProvider>
        </Row>
      </Container>
    </>
  )
}
