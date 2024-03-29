import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";
import { socketFriendRequest } from "socketio";
import UserInfo from "components/Utils/UserCard/UserInfo";
import UserActions from "components/Utils/UserCard/UserActions";
import { userEmpty } from "scripts/fillers";
import { UserShortType } from "typings/UserTypes";
import { getUser } from "scripts/usersCache";

const UserCard = ({ uid }: { uid: string }) => {
  const [user, setUser] = React.useState<UserShortType>(userEmpty);
  const [showButtons, setShowButtons] = React.useState(false);
  const senderUID = useTypedSelector((s) => s.user.uid);
  const friendsList = useTypedSelector((s) => s.user.friendsUID);
  const actionsMenuRef = React.useRef<HTMLDivElement>(null);

  const isFriend = friendsList.indexOf(uid) !== -1 ? true : false;

  React.useEffect(() => {
    getUser(uid, setUser);
  }, [uid]);

  const toggleMenu = (e: MouseEvent) => {
    if (
      actionsMenuRef.current &&
      actionsMenuRef.current.contains(e.target as any)
    ) {
      return false;
    }

    setShowButtons(() => {
      document.removeEventListener("click", toggleMenu, false);
      return false;
    });
  };

  const menuHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    v?: boolean
  ) => {
    if (v !== undefined) {
      setShowButtons(() => {
        document.removeEventListener("click", toggleMenu, false);
        return v;
      });
    } else {
      e.stopPropagation();
      setShowButtons(() => {
        document.addEventListener("click", toggleMenu, false);
        return true;
      });
    }
  };

  const privacy = user.privacy;

  const friendActionHandler = () => {
    if (senderUID === null) return;
    if (isFriend === true) {
      socketFriendRequest(user.uid, "remove");
    }
    if (isFriend === false) {
      socketFriendRequest(user.uid, "add");
    }
  };

  return (
    <div className="w-full px-0 sm:px-3 h-16 sm:h-20 first:md:mt-0 border-0 border-t first:border-t-0 hover:border-transparent dark:hover:border-transparent sibhover:border-transparent dark:sibhover:border-transparent border-solid border-gray-300 dark:border-gray-600">
      <div className="w-full h-full group hover:bg-slate-200 dark:hover:bg-slate-700 flex py-2 px-2 sm:px-4 sm:rounded-xl">
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
            privacy={privacy}
            actionsMenuRef={actionsMenuRef}
            uid={user.uid}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserCard;
