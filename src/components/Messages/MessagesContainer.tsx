import React from "react";
import { useSearchParams } from "react-router-dom";
import MessagesChats from "components/Messages/MessagesBar/MessagesChats";
import MessagesSearchBar from "components/Messages/MessagesBar/MessagesSearchBar";
import MessagesBackground from "components/Messages/MessagesBackground";
import MessagesChat from "components/Messages/MessagesChat/MessagesChat";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import { setCurrentDialog } from "scripts/currentDialog";
import { ChatTwoType } from "typings/cacheTypes";

const MessagesContainer = () => {
  const chats = useTypedSelector((s) => s.cache.chats);
  const [chatSearch, setChatSearch] = React.useState<string>("");
  const chatCID = useTypedSelector((s) => s.cache.dialogCID);
  const usp = useSearchParams();
  const dispatch = useTypedDispatch();
  const cu = useTypedSelector((s) => s.user.uid);

  React.useEffect(() => {
    const m = usp[0].get("m");
    const u = usp[0].get("u");

    if (m) {
      setCurrentDialog(m);
    } else if (u && u !== cu) {
      const chat = chats.filter(
        (c) => c.chatType === "two-side" && c.usersUID.includes(u)
      );
      if (chat.length === 1) {
        setCurrentDialog(chat[0].cid);
      } else {
        dispatch({
          type: "CACHE_CHAT_SET",
          payload: {
            chat: {
              chatType: "two-side",
              cid: `TEMP__${u}`,
              messagesCount: 0,
              usersUID: [u, cu],
            } as ChatTwoType,
            isTemp: true,
          },
        });
        setCurrentDialog(`TEMP__${u}`);
      }
    }
  }, []);

  return (
    <section className="cont justify-start">
      <div
        className={`${
          chatCID === null
            ? "w-full flex md:w-72 lg:w-96"
            : "hidden md:flex md:w-72 lg:w-96"
        } flex-col shrink-0 relative z-20`}
      >
        <MessagesSearchBar
          setChatSearch={setChatSearch}
          chatSearch={chatSearch}
        />
        <MessagesChats chats={chats} chatSearch={chatSearch} />
      </div>
      <div className="hidden md:block w-px shrink-0 h-full bg-gray-400 dark:bg-gray-500"></div>
      {chatCID !== null ? (
        <div className="w-full h-full flex-1">
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
