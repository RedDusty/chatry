import React from "react";
import UserIcon from "components/Utils/UserIcon";
import lastOnline from "scripts/lastOnline";

type ProfileInfoType = {
  avatar: string | null | undefined;
  displayName: string | undefined;
  uid: string | null | undefined;
  online: true | number | undefined;
  friendsUID: string[] | undefined;
};

const ProfileInfo = ({
  avatar,
  displayName,
  friendsUID,
  online,
  uid,
}: ProfileInfoType) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center w-full">
      <div
        className={`${
          avatar !== undefined
            ? "fill-sky-600 dark:fill-indigo-800"
            : "rounded-full overflow-hidden"
        } w-64 h-64 sm:w-28 sm:h-28 lg:w-36 lg:h-36 mx-auto sm:mx-0 shrink-0`}
      >
        <UserIcon avatar={avatar} />
      </div>
      <div className="flex-1 flex flex-col items-center sm:items-start">
        <p
          className={`${
            displayName !== undefined
              ? "text-4xl font-medium text-lighter"
              : "bg-slate-400 dark:bg-slate-500 rounded-lg animate-pulse w-64 lg:w-96 px-8 h-12"
          } mt-6 sm:mt-0 sm:ml-4 sm:grow`}
        >
          {displayName}
        </p>
        <p
          className={`${
            online !== undefined
              ? online === true
                ? "text-lg text-green-600 dark:text-green-400"
                : "text-lg text"
              : "w-24 h-6 rounded-md animate-pulse bg-green-400 dark:bg-green-500"
          } sm:ml-4 mt-2 font-semibold`}
        >
          {online !== undefined ? lastOnline(online) || "Offline" : ""}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
