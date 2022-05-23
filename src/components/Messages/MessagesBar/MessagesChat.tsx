import React from "react";
import UserIcon from "components/Utils/UserIcon";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType, MessageType } from "typings/cacheTypes";
import { setCurrentDialog } from "scripts/currentDialog";
import { useNavigate, createSearchParams } from "react-router-dom";
import { UserShortType } from "typings/UserTypes";
import { getUser } from "scripts/usersCache";

const MessagesChat = ({
  chat,
  cu,
  isActive,
}: {
  chat: ChatType;
  cu: string;
  isActive: boolean;
}) => {
  const [user, setUser] = React.useState<UserShortType | null>(null);
  const [chatName, setChatName] = React.useState("");
  const c = chat;
  const navigate = useNavigate();
  const cd = useTypedSelector((s) => s.cache.dialogCID);
  const lastMessage = useTypedSelector((s) =>
    s.cache.messages.filter((m) => m.cid === chat.cid)
  )[0].messages.at(-1);
  const userUID = c.usersUID.filter((u) => u !== cu)[0];

  React.useEffect(() => {
    if (c.chatType === "two-side") {
      getUser(userUID ? userUID : null, setUser).then((v) => {
        if (v) {
          setChatName(v.username);
        }
      });
    } else {
      setChatName(c.name);
    }
  }, [c, userUID]);

  const messageExist = lastMessage
    ? lastMessage
    : ({ message: "No messages", time: 0, user: "system" } as MessageType);

  const messageVisible = () => {
    let msg = "";

    if (
      messageExist.user === "system" &&
      messageExist.message === "No messages"
    ) {
      msg = "No messages";
      return msg;
    }

    if (
      messageExist.user === "system" &&
      messageExist.message !== "No messages"
    ) {
      msg = "[System message]";
      return msg;
    }

    if (messageExist.user === cu) {
      msg += "You: ";
    }

    if (messageExist.images && messageExist.images.length !== 0) {
      if (messageExist.images.length === 1) {
        msg += "Image";
      } else {
        msg += messageExist.images.length + " images";
      }

      return msg;
    }

    if (typeof messageExist.message === "string") {
      msg += messageExist.message;
      return msg;
    } else {
      msg += "Replied message";
      return msg;
    }
  };

  return (
    <div
      className={`w-full h-16 p-2 flex-shrink-0 flex ${
        isActive
          ? "bg-sky-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 hover:bg-sky-300"
          : "hover:bg-slate-200 dark:hover:bg-slate-700"
      } group rounded-lg cursor-pointer`}
      onClick={() => {
        if (cd !== c.cid) {
          setCurrentDialog(c.cid);
          navigate({ search: createSearchParams({ m: c.cid }).toString() });
        }
      }}
    >
      <ChatAvatar chat={c} cu={cu} altName={chatName} user={user} />
      <div className="flex flex-col ml-3 w-[calc(100%-75px)] lg:w-72">
        <p className="truncate w-full font-semibold text-slate-800 dark:text-slate-300">
          {chatName}
        </p>
        <div className="flex w-full">
          {c.chatType !== "two-side" ? (
            <div className="w-6 h-6">
              <UserIcon
                avatar={messageExist.user !== "system" ? user?.avatar : null}
              />
            </div>
          ) : (
            <></>
          )}
          <p className="text-slate-800 dark:text-slate-300 truncate">
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
  user,
}: {
  chat: ChatType;
  cu: string;
  altName: string;
  user: UserShortType | null;
}) => {
  const userAvatar = chat.chatType === "two-side" ? user?.avatar : null;

  const inOnline = chat.chatType === "two-side" ? user?.online : null;

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
