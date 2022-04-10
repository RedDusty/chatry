import IconLink from "icons/IconLink";
import React from "react";
import { Link } from "react-router-dom";
import lastOnline from "scripts/lastOnline";
import UserIcon from "../UserIcon";

type UserInfoComponentType = {
  avatar: string | null;
  username: string;
  online: number | true;
};

const UserInfo = ({ avatar, online, username }: UserInfoComponentType) => {
  return (
    <div className="flex">
      <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full overflow-hidden relative">
        <UserIcon avatar={avatar} />
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
              <p className="text truncate">{lastOnline(online) || "Offline"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
