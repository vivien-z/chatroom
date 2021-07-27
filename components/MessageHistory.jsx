import { useCallback } from "react";
import { useChatrooms, selectedChatroom } from "../context/ChatroomsProvider";

// const MessageHistory = ({ value, selectedChatroom }) => {
const MessageHistory = () => {

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  },[])
  const { selectedChatroom } = useChatrooms()

  console.log(selectedChatroom)
  console.log(selectedChatroom.formattedMessages)
  return (
    <div className="h-100 d-flex flex-column align-items-start
    justify-content-end px-3 border">
      {selectedChatroom.formattedMessages.map((m, i) => {
        const lastMessage = (selectedChatroom.formattedMessages.length - 1) === i
        return (
          <div
            ref={lastMessage ? setRef : null}
            key={i}
            className={`my-1 d-flex flex-column ${m.fromMe ? 'align-self-end' : ''}`}
          >
            <div
              className={`rounded px-2 py-1 ${m.fromMe ? 'bg-primary text-white' : 'border'}`}
            >
              {m.messageContent}
            </div>
            <div
              className={`text-muted small ${m.fromMe ? 'text-right' : ''}`}
            >
              <b>{m.fromMe ? 'You' : m.senderName}</b>:
            </div>
          </div>
        )
      })}

      connected
    </div>
  );
};

export default MessageHistory;
