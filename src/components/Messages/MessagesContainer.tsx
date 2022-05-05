import React from "react";
import MessagesChats from "components/Messages/MessagesBar/MessagesChats";
import MessagesSearchBar from "components/Messages/MessagesBar/MessagesSearchBar";
import MessagesBackground from "components/Messages/MessagesBackground";
import { useTypedSelector } from "redux/useTypedRedux";

const MessagesContainer = () => {
  const [chatCID, setChatCID] = React.useState<string | null>(null);
  const chats = useTypedSelector((s) => s.cache.chats);

  return (
    <section className="flex flex-1 justify-start">
      {chatCID === null ? (
        <div className="w-full md:w-96 flex flex-col shrink-0">
          <MessagesSearchBar />
          <MessagesChats chats={chats} setChatCID={setChatCID} />
        </div>
      ) : (
        <></>
      )}
      <div className="hidden md:block w-px shrink-0 h-full bg-gray-400 dark:bg-gray-500"></div>
      {chatCID !== null ? (
        <div className='w-full h-full flex-1"'>
          <MessagesBackground component={<div>{chatCID}</div>} />
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
