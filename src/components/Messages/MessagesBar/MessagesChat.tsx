import UserIcon from "components/Utils/UserIcon";
import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType, MessageType } from "typings/cacheTypes";
import { setCurrentDialog } from "scripts/currentDialog";

const MessagesChat = ({
  chat,
  cu,
  isActive,
}: {
  chat: ChatType;
  cu: string;
  isActive: boolean;
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
      className={`w-full h-16 p-2 flex-shrink-0 flex ${
        isActive
          ? "bg-sky-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 hover:bg-sky-300"
          : "hover:bg-slate-200 dark:hover:bg-slate-700"
      } group rounded-lg cursor-pointer`}
      onClick={() => {
        setCurrentDialog(c.cid);
      }}
    >
      <ChatAvatar chat={c} cu={cu} altName={chatName} />
      <div className="flex flex-col ml-3 w-[calc(100%-75px)] lg:w-72">
        <p className="truncate w-full font-semibold text-slate-800 dark:text-slate-300">
          {chatName}
        </p>
        <div className="flex w-full">
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
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
        <UserIcon avatar={chat.avatar} alt={altName} isOnline={inOnline} />
      </div>
    );
  } else if (chat.chatType === "two-side" && userAvatar) {
    return (
      <div className="w-12 h-12 rounded-full relative shrink-0">
        <UserIcon avatar={userAvatar} alt={altName} isOnline={inOnline} />
      </div>
    );
  } else {
    return (
      <div className="w-12 h-12 rounded-full relative shrink-0">
        <UserIcon avatar={null} alt={altName} isOnline={inOnline} />
      </div>
    );
  }
};
