import React from "react";
import { notificationType } from "typings/NotificationsTypes";
import notificationBuilder from "scripts/notificationBuilder";
import UserIcon from "components/Utils/UserIcon";
import IconInfo from "icons/IconInfo";

const Notification = (notif: notificationType) => {
  const n = notificationBuilder(notif);

  return (
    <div className="sm:m-1 w-full px-2 py-0.5 sm:rounded-md flex flex-col justify-between items-center">
      <div className="flex w-full">
        <NotificationIcon icon={n.icon} />
        <div className="w-full ml-3">
          <div className="flex justify-between">
            <div className="text-2xl text-slate-900 dark:text-gray-200">
              {n.header}
            </div>
          </div>
          <div>
            {typeof n.data === "string" ? (
              <p className="text-slate-800 dark:text-gray-300">{n.data}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <NotificationFooter timeNumber={n.time} />
    </div>
  );
};

export default Notification;

const NotificationIcon = ({ icon }: { icon: string | null }) => {
  if (icon) {
    return (
      <div className="w-16 h-16 mt-1">
        <UserIcon avatar={icon} />
      </div>
    );
  }

  return (
    <div className="w-16 h-14 sm:w-12 sm:h-10 bg-slate-50 dark:bg-slate-800 fill-slate-900 dark:fill-gray-400 rounded-full mt-1">
      <IconInfo />
    </div>
  );
};

const NotificationFooter = ({ timeNumber }: { timeNumber: number }) => {
  const notifTime = () => {
    const uDate = new Date(timeNumber);

    let time: string = "Today at ";

    if (new Date().getTime() > uDate.getTime() + 31536000000) {
      time =
        uDate.toLocaleString("default", { day: "2-digit" }) +
        " " +
        uDate.toLocaleString("default", { month: "long" }) +
        " " +
        uDate.toLocaleString("default", { year: "numeric" }) +
        " at ";
    }

    if (new Date().getTime() > uDate.getTime() + 86400000) {
      time =
        uDate.toLocaleString("default", { day: "2-digit" }) +
        " " +
        uDate.toLocaleString("default", { month: "long" }) +
        " at ";
    }

    time =
      time +
      ("0" + uDate.getHours()).slice(-2) +
      ":" +
      ("0" + uDate.getMinutes()).slice(-2) +
      ":" +
      ("0" + uDate.getSeconds()).slice(-2);

    return time;
  };

  return (
    <div className="w-full">
      <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap max-w-min ml-auto mr-4">
        {notifTime()}
      </p>
      <div className="w-2/3 border-0 border-b border-solid border-slate-400 mx-auto py-1"></div>
    </div>
  );
};
