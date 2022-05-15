import React from "react";
import UserIcon from "components/Utils/UserIcon";
import { useTypedSelector } from "redux/useTypedRedux";
import timeConverter from "scripts/timeConverter";
import { MessageType } from "typings/cacheTypes";

const MessagesMessage = ({ m }: { m: MessageType }) => {
  const cu = useTypedSelector((s) => s.user.uid);
  const view = useTypedSelector((s) => s.user.userSettings.messageView);

  if (m.user === "system") {
    return (
      <div className="text-slate-700 dark:text-slate-300 font-semibold text-lg self-center my-4">
        {m.message}
      </div>
    );
  }

  const isCUOwner = cu === m.user.uid;
  const isPlaceSep = view === "separately" && isCUOwner;

  return (
    <div
      className={`${
        isPlaceSep ? "self-end flex-row" : "self-start flex-row-reverse"
      } flex items-start gap-2`}
    >
      <div className="flex flex-col gap-1">
        <p
          className={`${
            isCUOwner
              ? "text-sky-600 dark:text-indigo-400"
              : "text-slate-700 dark:text-slate-300"
          } ${m.error && "text-red-600 dark:text-red-400"} ${
            isPlaceSep && isCUOwner ? "self-end" : "self-start"
          } font-semibold`}
        >
          {m.user.username}
        </p>
        <p
          className={`${
            isCUOwner
              ? "bg-sky-200 dark:bg-indigo-900"
              : "bg-slate-200 dark:bg-slate-700"
          } ${m.error && "bg-red-200 dark:bg-red-900"} ${
            isPlaceSep && isCUOwner ? "self-end" : "self-start"
          } px-2 py-1 rounded-lg text-slate-900 dark:text-slate-200`}
        >
          {m.message}
        </p>
        <p
          className={`${
            isPlaceSep ? "self-start" : "self-end"
          } text-xs text-slate-600 dark:text-slate-400 ${m.error && "text-red-600 dark:text-red-400"}`}
        >
          {m.error ? "not sent" : timeConverter(m.time)}
        </p>
      </div>
      <div className="w-12 h-12 shrink-0 relative">
        <UserIcon
          avatar={m.user.avatar}
          isOnline={m.user.online}
          alt={m.user.username}
        />
      </div>
    </div>
  );
};

export default MessagesMessage;
