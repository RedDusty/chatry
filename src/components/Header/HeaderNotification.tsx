import React from "react";
import IconBellRotated from "icons/IconBellRotated";
import { useTypedSelector } from "redux/useTypedRedux";

type HeaderNotificationComponentType = {
  isNotifShow: boolean;
  toggleNotifications: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    v?: boolean | undefined
  ) => void;
};

const HeaderNotification = ({
  isNotifShow,
  toggleNotifications,
}: HeaderNotificationComponentType) => {
  const uid = useTypedSelector((s) => s.user.uid);

  if (uid === null) {
    return <></>;
  }

  return (
    <button
      className={`${
        isNotifShow
          ? "fill-sky-600 dark:fill-indigo-300 bg-sky-400 dark:bg-indigo-500 bg-opacity-30 dark:bg-opacity-30"
          : "fill-gray-500 dark:fill-gray-400 hover:fill-sky-600 dark:hover:fill-indigo-300 bg-sky-500 dark:bg-indigo-400 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10"
      } flex group w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:mx-auto sm:mt-2 flex-col items-center`}
      onClick={(e) => {
        if (isNotifShow) {
          toggleNotifications(e, false);
        } else {
          toggleNotifications(e);
        }
      }}
    >
      <span
        className={`${
          isNotifShow ? "opacity-75" : "group-hover:opacity-60"
        } w-full h-full p-2 sm:p-3`}
      >
        <IconBellRotated />
      </span>
    </button>
  );
};

export default HeaderNotification;
