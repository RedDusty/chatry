import React from "react";
import { Link } from "react-router-dom";
import IconUser from "icons/IconUser";
import { UserShortType } from "typings/UserTypes";
import lastOnline from "scripts/lastOnline";

const UserCard = ({ user }: { user: UserShortType }) => {
  const userAvatar = () => {
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          alt="to"
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      );
    } else return <IconUser />;
  };

  return (
    <div className="w-full px-3 h-20 first:md:mt-0 border-0 border-t first:border-t-0 hover:border-transparent dark:hover:border-transparent sibhover:border-transparent dark:sibhover:border-transparent border-solid border-gray-300 dark:border-gray-600">
      <div className="w-full h-full hover:bg-gray-200 dark:hover:bg-gray-700 flex py-2 px-4 sm:rounded-xl">
        <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full overflow-hidden relative">
          {userAvatar()}
        </div>
        <div className="ml-2 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center">
            <p className="truncate font-semibold text-xl text-zinc-900 dark:text-zinc-300">
              {user.displayName || "Anon"}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center overflow-hidden shrink-0">
              {user.online === true ? (
                <div className="w-4 h-4 shrink-0 bg-green-500 rounded-full mr-2"></div>
              ) : (
                <></>
              )}
              <p className="text-zinc-700 dark:text-zinc-400 truncate">
                {lastOnline(user.online) || "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
