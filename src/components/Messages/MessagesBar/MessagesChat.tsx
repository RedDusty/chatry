import React from "react";
import UserIcon from "components/Utils/UserIcon";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType, MessageType } from "typings/cacheTypes";
import { setCurrentDialog } from "scripts/currentDialog";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

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
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const lastMessage = useTypedSelector((s) =>
    s.cache.messages.filter((m) => m.cid === chat.cid)
  )[0].messages.at(-1);
  const chatName =
    chat.chatType === "two-side"
      ? chat.users.filter((v) => v.uid !== cu)[0].username
      : chat.name;

  const messageExist = lastMessage
    ? lastMessage
    : ({ message: "No messages", time: 0, user: "system" } as MessageType);

  const messageVisible = () => {
    if (
      messageExist.message === "No messages" &&
      messageExist.user === "system"
    )
      return "No messages";
    if (messageExist.files) return "File";
    if (
      typeof messageExist.message === "string" &&
      messageExist.user !== "system"
    )
      return messageExist.user.uid === cu
        ? "You: " + messageExist.message
        : messageExist.message;
    if (
      typeof messageExist.message !== "string" &&
      messageExist.user !== "system"
    )
      return messageExist.user.uid === cu ? "You replied" : "Replied";
    if (messageExist.user === "system") return "System message";
    return "Message";
  };

  return (
    <div
      className={`w-full h-16 p-2 flex-shrink-0 flex ${
        isActive
          ? "bg-sky-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 hover:bg-sky-300"
          : "hover:bg-slate-200 dark:hover:bg-slate-700"
      } group rounded-lg cursor-pointer`}
      onClick={() => {
        if (searchParams[0].get("m") !== c.cid) {
          setCurrentDialog(c.cid);
          navigate({ search: createSearchParams({ m: c.cid }).toString() });
        }
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
          <p className="text-slate-800 dark:text-slate-300">
            {messageVisible()}
          </p>
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
