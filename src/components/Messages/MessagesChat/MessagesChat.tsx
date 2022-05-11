import React from "react";
import MessagesHeader from "components/Messages/MessagesChat/MessagesHeader";
import MessagesDialog from "components/Messages/MessagesChat/MessagesDialog";
import MessagesInput from "components/Messages/MessagesChat/MessagesInput";
import { getCurrentDialog } from "scripts/currentDialog";

const MessagesChat = () => {
  const chat = getCurrentDialog();

  if (chat === null) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between flex-1">
      <MessagesHeader c={chat.chat} />
      <MessagesDialog />
      <MessagesInput c={chat.chat} />
    </div>
  );
};

export default MessagesChat;
