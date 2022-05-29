import React from "react";
import { createSearchParams, Link } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";
import { socketFriendRequest } from "socketio";
import { UserPrivacyType } from "typings/UserTypes";

type ProfileActionsType = {
  uid: string;
  privacy: UserPrivacyType;
};

const ProfileActions = ({ uid, privacy }: ProfileActionsType) => {
  const cu = useTypedSelector((s) => s.user.uid);
  const isFriend = useTypedSelector((s) =>
    s.user.friendsUID.indexOf(uid) !== -1 ? true : false
  );

  const friendActionHandler = () => {
    if ((cu === null || uid === null) && cu === uid) return;
    if (isFriend === true) {
      socketFriendRequest(uid, "remove");
    }
    if (isFriend === false) {
      socketFriendRequest(uid, "add");
    }
  };

  if (cu === null) {
    return (
      <div className="mt-2 mx-auto sm:ml-0 flex flex-wrap justify-center items-center gap-2">
        <Link
          to={"/auth"}
          className="bg-sky-600 hover:bg-sky-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 border border-solid border-black text-white text-center font-semibold py-1 px-2 rounded-md w-48"
        >
          Auth
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-2 mx-auto sm:ml-0 flex flex-wrap justify-center items-center gap-2">
      <button
        className={`${
          isFriend
            ? "bg-red-600 hover:bg-red-500"
            : "bg-green-600 hover:bg-green-500"
        } border border-solid border-black text-white font-semibold py-1 px-2 rounded-md w-48`}
        onClick={friendActionHandler}
      >
        {isFriend ? "Remove friend" : "Add friend"}
      </button>
      {privacy.twoside === "all" ||
      (privacy.twoside === "friends" && isFriend) ? (
        <Link
          to={{
            pathname: "/messages",
            search: createSearchParams({ u: uid }).toString(),
          }}
          className="bg-sky-600 hover:bg-sky-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 border border-solid border-black text-white text-center font-semibold py-1 px-2 rounded-md w-48"
        >
          Write message
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileActions;
