import React from "react";
import { Link } from "react-router-dom";
import { UserShortType } from "typings/UserTypes";
import lastOnline from "scripts/lastOnline";
import UserIcon from "components/Utils/UserIcon";
import IconDots from "icons/IconDots";
import IconMessages from "icons/IconMessages";
import { useTypedSelector } from "redux/useTypedRedux";
import { socketFriendRequest } from "socketio";

const UserCard = ({ user }: { user: UserShortType }) => {
  const [showButtons, setShowButtons] = React.useState(false);
  const senderUID = useTypedSelector((s) => s.user.uid);
  const friendsList = useTypedSelector((s) => s.user.friendsUID);

  const isFriend = friendsList.indexOf(user.uid) !== -1 ? true : false;

  const toggleMenu = (e: MouseEvent) => {
    if ((e.target as HTMLElement).dataset.menu) {
      return false;
    }

    setShowButtons(() => {
      document.removeEventListener("click", toggleMenu, false);
      return false;
    });
  };

  const menuHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowButtons(() => {
      document.addEventListener("click", toggleMenu, false);
      return true;
    });
  };

  const friendActionHandler = () => {
    if (isFriend === true) {
      socketFriendRequest(senderUID!, user.uid, "remove");
    }
    if (isFriend === false) {
      socketFriendRequest(senderUID!, user.uid, "add");
    }
  };

  const writeMessageHandler = () => {
    console.warn("MESSAGE HANDLER IN FRIENDS TAB");
  };

  return (
    <div className="w-full px-0 sm:px-3 h-16 sm:h-20 first:md:mt-0 border-0 border-t first:border-t-0 hover:border-transparent dark:hover:border-transparent sibhover:border-transparent dark:sibhover:border-transparent border-solid border-gray-300 dark:border-gray-600">
      <div className="w-full h-full hover:bg-gray-300 dark:hover:bg-gray-800 flex py-2 px-2 sm:px-4 sm:rounded-xl">
        <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-full overflow-hidden relative">
          <UserIcon avatar={user.avatar} />
        </div>
        <div className="ml-2 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center">
            <p className="truncate font-semibold text-xl text-zinc-900 dark:text-zinc-300">
              {user.username || "Anon"}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center overflow-hidden shrink-0 sm:font-semibold">
              {user.online === true ? (
                <p className="text-green-600 dark:text-green-400">{"Online"}</p>
              ) : (
                <p className="text truncate">
                  {lastOnline(user.online) || "Offline"}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end h-full">
          <div className="relative">
            <button
              className="btn-style p-2 w-12 h-12 sm:w-14 sm:h-14 rounded-md text hover:text-sky-800 dark:hover:text-indigo-300"
              onClick={menuHandler}
            >
              <IconDots rotate={90} />
            </button>
            <div
              className={`${
                showButtons ? "block" : "hidden"
              } absolute top-0 -left-60 w-56 h-24 bg-gray-200 dark:bg-gray-700 rounded-md shadow transition-opacity p-2 flex flex-col justify-center items-center`}
              data-menu={true}
            >
              <button
                className={`${
                  isFriend
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-green-600 hover:bg-green-500"
                } border border-solid border-black text-white font-semibold py-1 px-2 rounded-md w-48`}
                onClick={friendActionHandler}
                data-menu={true}
              >
                {isFriend ? "Remove friend" : "Add friend"}
              </button>
              <button
                className="bg-sky-600 hover:bg-sky-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 border border-solid border-black text-white font-semibold py-1 px-2 rounded-md w-48 mt-2"
                onClick={writeMessageHandler}
                data-menu={true}
              >
                Write message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
