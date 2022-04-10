import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";
import Notification from "components/Notifications/Notification";

type NotificationsType = {
  isNotifShow: boolean;
};

const Notifications = ({ isNotifShow }: NotificationsType) => {
  const notifs = useTypedSelector((s) => s.notifications);

  if (isNotifShow === false) return <></>;

  if (notifs.length === 0) {
    return (
      <section className="flex fixed w-full h-[calc(100%-56px)] sm:w-72 sm:h-96 z-40 notif smLshadow sm:rounded-md bg-slate-200 dark:bg-slate-800 overflow-auto">
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center font-semibold text-xl text-slate-700 dark:text-slate-300">
            No notifications...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex fixed w-full h-[calc(100%-56px)] sm:w-80 sm:h-96 z-40 notif smLshadow sm:rounded-md bg-slate-50 sm:bg-slate-100 dark:bg-slate-900 sm:dark:bg-slate-800 sm:shadow-md sm:border sm:border-solid sm:border-slate-300 sm:dark:border-slate-600 overflow-auto">
      <div className="flex flex-col w-full overflow-x-hidden gap-y-2 pt-2">
        {notifs.map((notif, idx) => {
          return <Notification {...notif} key={notif.header + idx} />;
        })}
        <div className="bg-slate-200 dark:bg-slate-700 mx-auto rounded-md sm:rounded-none p-4 sm:p-0 mt-2 my-2 sm:mb-0 sm:w-full sm:py-2">
          <p className="text-slate-900 dark:text-slate-100 whitespace-nowrap max-w-min sm:max-w-full sm:text-center">
            You can only get the last 10 notifications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
