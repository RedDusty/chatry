import React from "react";
import MessagesHeader from "components/Messages/MessagesChat/MessagesHeader";
import { getCurrentDialog } from "scripts/currentDialog";

const MessagesChat = () => {
  const chat = getCurrentDialog();

  if (chat === null) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <MessagesHeader c={chat.chat} />
    </div>
  );
};

export default MessagesChat;
