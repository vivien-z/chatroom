import Head from 'next/head';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UsernameField from "../components/UsernameField";
import MessageInputField from "../components/MessageInputField";
import styles from '../styles/Home.module.css';

export default function Home() {
  // save the socket
  const [socket, setSocket] = useState(null);

  // Whether the username is set.
  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);

  // State for the username.
  const [username, setUsername] = useState("");

  // State for the form field.
  const [message, setMessage] = useState("");

  // State for message history.
  const [history, setHistory] = useState([
    /*
    {
      username: "Santa Claus",
      message: "Ho ho ho!"
    }
    */
  ]);

  const connectSocket = () => {
    // prime the server first. yes, this is an extra call and is inefficient.
    // but we're using NextJS for convenience, so this is a necessary evil.
    fetch("/api/chat");
    // after making sure that socket server is primed, connect to it.

    if (!socket) {
      const newSocket = io();

      // Confirms connection
      newSocket.on("connect", () => {
        console.log("Chat app connected");
      });

      // handles message
      newSocket.on("message", (msg) => {
        setHistory((history) => [...history, msg]);
      });

      // Logs when server disconnects
      newSocket.on("disconnect", () => {
        console.warn("WARNING: chat app disconnected");
      });

      setSocket(() => newSocket);
    }
  };

  // The websocket code
  useEffect(() => {
    connectSocket();
  }, []);

  // this method submits the form and sends the message to the server.
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!socket) {
      alert("Chatroom not connected yet. Try again in a little bit.");
      return;
    }

    // prevent empty submissions
    if (!message || !isUsernameConfirmed) {
      return;
    }

    // submit and blank-out the field.
    socket.emit("message-submitted", { message, username });
    setMessage("");
  };

  return (
    <div>
      <Head>
        <title>2chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <UsernameField
          completed={isUsernameConfirmed}
          value={username}
          onChange={(value) => setUsername(value)}
          onSubmit={() => setUsernameConfirmed(true)}
          placeholder={"Set username..."}
        />

        <MessageInputField
          onSubmit={handleSubmit}
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={ "Enter your message..."
            // username ? "Enter your message..." : "Set username..."
          }
          disabled={!isUsernameConfirmed}
        />

        {/* The list of messages */}
        <div>
          {history.map(({ username, message }, i) => (
            <div key={i}>
              <b>{username}</b>: {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }
