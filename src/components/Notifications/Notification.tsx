import React from "react";
import { notificationType } from "typings/NotificationsTypes";
import notificationBuilder from "scripts/notificationBuilder";
import UserIcon from "components/Utils/UserIcon";
import IconInfo from "icons/IconInfo";
import { Link } from "react-router-dom";

const Notification = ({
  notif,
  toggleNotifications,
}: {
  notif: notificationType;
  toggleNotifications: (v?: boolean) => void;
}) => {
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
            <NotificationContent
              data={n.data}
              toggleNotifications={toggleNotifications}
            />
          </div>
        </div>
      </div>
      <NotificationFooter timeNumber={n.time} username={n.data.username} />
    </div>
  );
};

export default Notification;

const NotificationContent = ({
  data,
  toggleNotifications,
}: {
  data: any;
  toggleNotifications: (v?: boolean) => void;
}) => {
  if (typeof data === "string") {
    return <p className="text-slate-800 dark:text-gray-300">{data}</p>;
  }

  if (data.text) {
    let text = data.text;
    if ((data.text as string).match(/%username%/gm)) {
      text = (data.text as string).replace(/%username%/gm, data.username);
    }
    return (
      <div className="flex flex-col">
        <p className="text-slate-800 dark:text-gray-300">{text}</p>
        {data.link ? (
          <Link
            className="link max-w-min whitespace-nowrap"
            to={data.link}
            onClick={(e) => {
              const link = data.link.split("?")[0];
              if (window.location.pathname === link) {
                e.preventDefault();
              } else {
                toggleNotifications(false);
              }
            }}
          >
            View...
          </Link>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return <></>;
};

const NotificationIcon = ({ icon }: { icon: string | null }) => {
  if (icon) {
    return (
      <div className="w-12 h-12 mt-1 flex-shrink-0">
        <UserIcon avatar={icon} />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 flex-shrink-0 sm:w-12 sm:h-10 fill-slate-900 dark:fill-gray-400 rounded-full mt-1">
      <IconInfo />
    </div>
  );
};

type NotificationFooterComponentType = {
  timeNumber: number;
  username?: string;
};

const NotificationFooter = ({
  timeNumber,
  username,
}: NotificationFooterComponentType) => {
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

  if (username) {
    return (
      <div className="w-full mt-1">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <Link to={"/user/" + String(username).toLowerCase()} className="link">
            {username}
          </Link>
          <p className="whitespace-nowrap mr-4">{notifTime()}</p>
        </div>
        <div className="w-2/3 border-0 border-b border-solid border-slate-400 mx-auto py-1"></div>
      </div>
    );
  }

  return (
    <div className="w-full mt-1">
      <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap max-w-min ml-auto mr-4">
        {notifTime()}
      </p>
      <div className="w-2/3 border-0 border-b border-solid border-slate-400 mx-auto py-1"></div>
    </div>
  );
};
