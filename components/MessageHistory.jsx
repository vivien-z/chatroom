import { useCallback } from "react";
import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";

const MessageHistory = ({ value, myUsername, myId }) => {
// const MessageHistory = () => {

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  },[])
  const { selectedChatroom } = useChatrooms()
  const msgList = selectedChatroom ? selectedChatroom.chatroomMessages : []

  return (
    <div className="d-flex flex-column align-items-start
    justify-content-start h-100 px-3 py-2 mb-2 bg-white rounded">
      { msgList.map((m, i) => {
        const lastMessage = (selectedChatroom.chatroomMessages.length - 1) === i
        return (
          <div
            ref={lastMessage ? setRef : null}
            key={i}
            className={`d-flex flex-column ${m.fromMe ? 'align-self-end' : 'mb-2'}`}
          >
            <div
              className={`rounded px-2 py-1 ${m.fromMe ? 'bg-primary text-white' : 'bg-white border'}`}
            >
              {m.messageContent}
            </div>
            <div
              className={`text-muted small ${m.fromMe ? 'text-end pe-1' : 'ps-1'}`}
            >
              <b>{m.fromMe ? 'You' : m.senderName}</b>:
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default MessageHistory;
