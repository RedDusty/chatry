import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType } from "typings/cacheTypes";

const MessagesHeaderActions = ({ c }: { c: ChatType }) => {
  const cu = useTypedSelector((s) => s.user.uid);

  const ct = c.chatType === "two-side";
  const username = ct && c.users.filter((u) => u.uid !== cu)[0].username;

  return (
    <div className={`w-full h-16 flex items-center`}>
      {ct && (
        <Link
          to={"/user/" + String(username).toLowerCase()}
          className="w-28 h-9 leading-9 text-center font-semibold text-lg cursor-pointer bg-slate-300 hover:bg-sky-300 dark:bg-slate-700 dark:hover:bg-indigo-800 text-slate-600 dark:text-slate-400 hover:text-sky-700 dark:hover:text-indigo-300 rounded-lg"
        >
          To profile
        </Link>
      )}
    </div>
  );
};

export default MessagesHeaderActions;
