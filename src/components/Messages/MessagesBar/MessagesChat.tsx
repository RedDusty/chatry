import UserIcon from "components/Utils/UserIcon";
import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType, MessageType } from "typings/cacheTypes";

const MessagesChat = ({
  chat,
  cu,
  setChatCID,
}: {
  chat: ChatType;
  cu: string;
  setChatCID: (v: string) => void;
}) => {
  const c = chat;
  const lastMessage = useTypedSelector((s) =>
    s.cache.messages.filter((m) => m.cid === chat.cid)
  )[0].messages[0];
  const chatName =
    chat.chatType === "two-side"
      ? chat.users.filter((v) => v.uid !== cu)[0].username
      : chat.name;

  const messageExist = lastMessage
    ? lastMessage
    : ({ message: "No messages", time: 0 } as MessageType);

  const messageVisible = messageExist.files
    ? "File"
    : typeof messageExist.message === "string"
    ? messageExist.message
    : "Reply";

  return (
    <div
      className="w-full h-16 p-2 flex-shrink-0 flex hover:bg-slate-200 dark:hover:bg-slate-700 group rounded-lg cursor-pointer"
      onClick={() => {
        setChatCID(chat.cid);
      }}
    >
      <ChatAvatar chat={c} cu={cu} altName={chatName} />
      <div className="flex flex-col ml-3">
        <p className="truncate w-48 font-semibold text-slate-800 dark:text-slate-300">
          {chatName}
        </p>
        <div className="flex">
          {c.chatType !== "two-side" ? (
            <div className="w-6 h-6">
              <UserIcon
                avatar={
                  messageExist.user !== "system"
                    ? messageExist.user.avatar
                    : null
                }
              />
            </div>
          ) : (
            <></>
          )}
          <p className="text-slate-800 dark:text-slate-300">{messageVisible}</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesChat;

const ChatAvatar = ({
  chat,
  cu,
  altName,
}: {
  chat: ChatType;
  cu: string;
  altName: string;
}) => {
  const userAvatar =
    chat.chatType === "two-side"
      ? chat.users.filter((u) => u.uid !== cu)[0].avatar
      : null;

  const inOnline =
    chat.chatType === "two-side"
      ? chat.users.filter((u) => u.uid !== cu)[0].online
      : null;

  if (chat.chatType !== "two-side" && chat.avatar) {
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <UserIcon avatar={chat.avatar} alt={altName} isOnline={inOnline} />
      </div>
    );
  } else if (chat.chatType === "two-side" && userAvatar) {
    return (
      <div className="w-12 h-12 rounded-full relative">
        <UserIcon avatar={userAvatar} alt={altName} isOnline={inOnline} />
      </div>
    );
  } else {
    return <UserIcon avatar={null} alt={altName} isOnline={inOnline} />;
  }
};
