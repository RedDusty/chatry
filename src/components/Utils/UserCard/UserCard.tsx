import React from "react";
import { UserShortType } from "typings/UserTypes";
import { useTypedSelector } from "redux/useTypedRedux";
import { socketFriendRequest } from "socketio";
import UserInfo from "components/Utils/UserCard/UserInfo";
import UserActions from "components/Utils/UserCard/UserActions";

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
    if (senderUID) return;
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
      <div className="w-full h-full hover:bg-gray-200 dark:hover:bg-gray-800 flex py-2 px-2 sm:px-4 sm:rounded-xl">
        <UserInfo
          avatar={user.avatar}
          online={user.online}
          username={user.username}
        />
        {senderUID ? (
          <UserActions
            friendActionHandler={friendActionHandler}
            isFriend={isFriend}
            menuHandler={menuHandler}
            showButtons={showButtons}
            writeMessageHandler={writeMessageHandler}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserCard;