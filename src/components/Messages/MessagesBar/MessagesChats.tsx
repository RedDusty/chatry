import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType } from "typings/cacheTypes";
import MessagesChat from "components/Messages/MessagesBar/MessagesChat";

const MessagesChats = ({ chats }: { chats: ChatType[] }) => {
  const cu = useTypedSelector((s) => s.user.uid!);
  const cd = useTypedSelector((s) => s.cache.dialogCID);

  if (chats.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center px-3 text-slate-700 dark:text-slate-400">
        <p className="text-center text-lg font-semibold">
          There is no dialogue with anyone.
        </p>
        <p className="text-center mt-2">
          Try searching through public search or{" "}
          <Link to={"/people"} className="link">
            find people
          </Link>{" "}
          to talk to.
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full px-2 flex flex-col justify-start items-center gap-1 overflow-y-auto">
        {chats.map((c, idx) => {
          return (
            <MessagesChat
              chat={c}
              cu={cu}
              key={c.cid + idx}
              isActive={c.cid === cd}
            />
          );
        })}
      </div>
    );
  }
};

export default MessagesChats;
