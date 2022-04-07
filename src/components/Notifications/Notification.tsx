import React from "react";
import lastOnline from "scripts/lastOnline";
import { Link } from "react-router-dom";
import UserIcon from "components/Utils/UserIcon";
import { notificationType } from "typings/NotificationsTypes";

const Notification = (notif: notificationType) => {
  const time = new Date(notif.time);

  return (
    <div className="sm:m-1 w-full h-36 px-2 py-0.5 bg-gray-300 dark:bg-gray-600 sm:rounded-md my-2">
      <div className="flex justify-between">
        <Link className="text-2xl font-semibold text-sky-600" to={"/friends"}>
          {notif.header}
        </Link>
        <p className="text-2xl font-semibold">{`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}</p>
      </div>
      {typeof notif.data === "string" ? (
        <p>{notif.data}</p>
      ) : (
        <div className="flex mt-1">
          <div className="w-24 h-24">
            <UserIcon avatar={notif.data.avatar} />
          </div>
          <div className="ml-4 flex flex-col justify-evenly">
            <Link
              to={`/profile/${notif.data.uid}`}
              className="text-2xl link truncate  max-w-min"
            >
              {notif.data.displayName || "Anon"}
            </Link>
            <p
              className={`${
                notif.data.online === true
                  ? "text-green-600 dark:text-green-400"
                  : "text truncate"
              } text-lg`}
            >
              {lastOnline(notif.data.online) || "Offline"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
