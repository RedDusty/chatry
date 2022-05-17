import React from "react";
import MessagesChats from "components/Messages/MessagesBar/MessagesChats";
import MessagesSearchBar from "components/Messages/MessagesBar/MessagesSearchBar";
import MessagesBackground from "components/Messages/MessagesBackground";
import MessagesChat from "components/Messages/MessagesChat/MessagesChat";
import { useTypedSelector } from "redux/useTypedRedux";

const MessagesContainer = () => {
  const chats = useTypedSelector((s) => s.cache.chats);
  const chatCID = useTypedSelector((s) => s.cache.dialogCID);

  return (
    <section className="cont justify-start">
      <div
        className={`${
          chatCID === null
            ? "w-full flex md:w-72 lg:w-96"
            : "hidden md:flex md:w-72 lg:w-96"
        } flex-col shrink-0 relative z-20`}
      >
        <MessagesSearchBar />
        <MessagesChats chats={chats} />
      </div>
      <div className="hidden md:block w-px shrink-0 h-full bg-gray-400 dark:bg-gray-500 relative z-20"></div>
      {chatCID !== null ? (
        <div className="w-full h-full flex-1 relative z-10">
          <MessagesBackground component={<MessagesChat />} />
        </div>
      ) : (
        <div className="hidden md:block w-full h-full flex-1">
          <MessagesBackground component={<></>} />
        </div>
      )}
    </section>
  );
};

export default MessagesContainer;
