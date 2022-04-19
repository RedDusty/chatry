import React from "react";
import Notification from "components/Notifications/Notification";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import axios from "axios";

type NotificationsType = {
  notificationsRef: React.RefObject<HTMLElement>;
  isNotifShow: boolean;
  toggleNotifications: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const NotificationsContainer = ({
  notificationsRef,
  isNotifShow,
  toggleNotifications,
}: NotificationsType) => {
  const userUID = useTypedSelector((s) => s.user.uid);
  const dispatch = useTypedDispatch();
  const notifs = useTypedSelector((s) => s.notifications);

  React.useEffect(() => {
    if (userUID) {
      axios.get("/api/notifications").then((res) => {
        if (res.data[0] && res.data[0].header) {
          dispatch({ type: "NOTIFICATIONS_SET", payload: res.data });
        }
      });
    }
  }, [dispatch, userUID]);

  if (isNotifShow === false) return <></>;

  if (notifs.length === 0) {
    return (
      <section
        className="flex fixed w-full h-[calc(100%-56px)] sm:w-72 sm:h-96 z-40 notif smLshadow sm:rounded-md bg-slate-200 dark:bg-slate-800 overflow-auto"
        ref={notificationsRef}
      >
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center font-semibold text-xl text-slate-700 dark:text-slate-300">
            No notifications...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex fixed w-full h-[calc(100%-56px)] sm:w-80 sm:h-96 z-40 notif smLshadow sm:rounded-md bg-slate-50 sm:bg-slate-100 dark:bg-slate-900 sm:dark:bg-slate-800 sm:shadow-md sm:border sm:border-solid sm:border-slate-300 sm:dark:border-slate-600 overflow-auto"
      ref={notificationsRef}
    >
      <div className="flex flex-col w-full overflow-x-hidden gap-y-2 pt-2">
        {notifs.map((notif, idx) => {
          return (
            <Notification
              notif={notif}
              toggleNotifications={toggleNotifications}
              key={notif.header + idx}
            />
          );
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

export default NotificationsContainer;
