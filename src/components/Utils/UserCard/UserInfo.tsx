import IconLink from "icons/IconLink";
import React from "react";
import { Link } from "react-router-dom";
import timeConverter from "scripts/timeConverter";
import UserIcon from "../UserIcon";

type UserInfoComponentType = {
  avatar: string | null;
  username: string;
  online: number | boolean;
};

const UserInfo = ({ avatar, online, username }: UserInfoComponentType) => {
  return (
    <div className="flex">
      <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full relative">
        <UserIcon avatar={avatar} alt={username} isOnline={online} />
      </div>
      <div className="ml-2 overflow-hidden flex flex-col justify-between">
        <div className="flex items-center">
          <p className="truncate font-semibold text-xl text-zinc-900 dark:text-zinc-300">
            {username || "Anon"}
          </p>
          <Link
            to={"/user/" + String(username).toLowerCase()}
            className="fill-zinc-900 dark:fill-zinc-300 w-4 h-4 ml-2"
          >
            <IconLink />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center overflow-hidden shrink-0 sm:font-semibold">
            {online === true ? (
              <p className="text-green-600 dark:text-green-400">{"Online"}</p>
            ) : (
              <p className="text truncate">
                {typeof online === "number" &&
                  "Last online: " + timeConverter(online, "short")}
                {online === false && "Offline"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
