import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";
import Notification from "components/Notifications/Notification";

type NotificationsType = {
  isNotifShow: boolean;
  getNotifications: () => void;
  isEnd: boolean;
};

const Notifications = ({
  isNotifShow,
  getNotifications,
  isEnd,
}: NotificationsType) => {
  const notifs = useTypedSelector((s) => s.notifications);

  if (isNotifShow === false) return <></>;

  return (
    <section className="flex fixed w-full h-[calc(100%-56px)] sm:w-72 sm:h-96 z-40 notif smLshadow sm:rounded-md bg-gray-200 dark:bg-gray-700 overflow-auto">
      {notifs.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center font-semibold text-xl text-slate-700 dark:text-slate-300">
            No notifications...
          </p>
        </div>
      ) : (
        <>
          {notifs.map((notif) => {
            return <Notification {...notif} />;
          })}
          {isEnd ? (
            <p className="text-black dark:text-white">
              You have received all notifications.
            </p>
          ) : (
            <button
              className="text-black dark:text-white w-full h-10 text-lg rounded-lg"
              onClick={getNotifications}
            >
              Load more...
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Notifications;
