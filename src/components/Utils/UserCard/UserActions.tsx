import React from "react";
import IconDots from "icons/IconDots";
import { UserPrivacyType } from "typings/UserTypes";

type UserActionsComponentType = {
  menuHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    v?: boolean | undefined
  ) => void;
  showButtons: boolean;
  isFriend: boolean;
  friendActionHandler: () => void;
  writeMessageHandler: () => void;
  privacy: UserPrivacyType;
  actionsMenuRef: React.RefObject<HTMLDivElement>;
};

const UserActions = ({
  menuHandler,
  showButtons,
  isFriend,
  friendActionHandler,
  writeMessageHandler,
  privacy,
  actionsMenuRef,
}: UserActionsComponentType) => {
  return (
    <div className="flex flex-1 items-center justify-end h-full">
      <div className="relative">
        <button
          className="btn-style p-2 w-12 h-12 sm:w-14 sm:h-14 rounded-md text hover:text-sky-800 dark:hover:text-indigo-300"
          onClick={(e) => {
            if (showButtons) {
              menuHandler(e, false);
            } else {
              menuHandler(e);
            }
          }}
        >
          <IconDots rotate={90} />
        </button>
        <div
          className={`${
            showButtons ? "block" : "hidden"
          } absolute top-0 -left-60 w-56 h-24 bg-gray-200 dark:bg-gray-700 rounded-md shadow transition-opacity p-2 flex flex-col justify-center items-center`}
          ref={actionsMenuRef}
        >
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
          <FriendsButton
            isFriend={isFriend}
            privacy={privacy}
            writeMessageHandler={writeMessageHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default UserActions;

type FriendsButtonComponentType = {
  writeMessageHandler: () => void;
  privacy: UserPrivacyType;
  isFriend: boolean;
};

const FriendsButton = ({
  writeMessageHandler,
  isFriend,
  privacy,
}: FriendsButtonComponentType) => {
  if (
    privacy.messages === "all" ||
    (privacy.messages === "friends" && isFriend)
  ) {
    return (
      <button
        className="bg-sky-600 hover:bg-sky-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 border border-solid border-black text-white font-semibold py-1 px-2 rounded-md w-48 mt-2"
        onClick={writeMessageHandler}
      >
        Write message
      </button>
    );
  }

  return <></>;
};
