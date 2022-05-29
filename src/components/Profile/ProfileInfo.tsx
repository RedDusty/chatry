import React from "react";
import UserIcon from "components/Utils/UserIcon";
import timeConverter from "scripts/timeConverter";
import { lastUsernamesType } from "typings/UserTypes";
import IconShow from "icons/IconShow";
import IconHide from "icons/IconHide";

type ProfileInfoType = {
  avatar: string | null | undefined;
  username: string | undefined;
  uid: string | null | undefined;
  online: boolean | number | undefined;
  lastUsernames?: lastUsernamesType[];
  error: "NOT_FOUND" | "FORBIDDEN_PRIVATE" | "FORBIDDEN_FRIEND" | null | true;
};

const ProfileInfo = ({
  avatar,
  username,
  online,
  lastUsernames,
  error,
}: ProfileInfoType) => {
  const [isShowLastUsernames, setShowLastUsernames] = React.useState(false);

  const canView = error !== "FORBIDDEN_FRIEND" && error !== "FORBIDDEN_PRIVATE";

  const lastUsernamesHandler = () => {
    if (canView) {
      setShowLastUsernames(!isShowLastUsernames);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col sm:flex-row sm:items-center w-full">
        <div
          className={`${
            avatar !== undefined
              ? "fill-sky-600 dark:fill-indigo-800"
              : "rounded-full"
          } w-64 h-64 sm:w-28 sm:h-28 lg:w-36 lg:h-36 mx-auto sm:mx-0 shrink-0 relative`}
        >
          <UserIcon avatar={avatar} alt={username} removeDot={true} />
        </div>
        <div className="flex-1 flex flex-col items-center sm:items-start">
          <div className="flex flex-col gap-2 mt-6 sm:mt-0 sm:ml-4 sm:grow">
            <div className="flex items-center justify-center gap-2">
              <p
                className={`${
                  username !== undefined
                    ? "text-4xl font-medium text-lighter"
                    : "bg-slate-400 dark:bg-slate-500 rounded-lg animate-pulse w-64 lg:w-96 px-8 h-12"
                }`}
              >
                {username}
              </p>
              {canView && (
                <button
                  className={`hover:fill-sky-600 dark:hover:fill-indigo-400 ${
                    isShowLastUsernames
                      ? "fill-green-500 dark:fill-green-400"
                      : "fill-black dark:fill-white"
                  }`}
                  title={`${
                    isShowLastUsernames ? "Hide" : "Show"
                  } 3 last usernames`}
                  onClick={lastUsernamesHandler}
                >
                  {isShowLastUsernames ? <IconHide /> : <IconShow />}
                </button>
              )}
            </div>
          </div>
          <p
            className={`${
              online !== undefined
                ? online === true
                  ? "text-lg text-green-600 dark:text-green-400"
                  : "text-lg text"
                : "w-24 h-6 rounded-md animate-pulse bg-green-400 dark:bg-green-500"
            } sm:ml-4 mt-2 font-semibold`}
          >
            {online !== undefined ? timeConverter(online) || "Offline" : ""}
          </p>
        </div>
      </div>
      {isShowLastUsernames && canView && (
        <div className="w-64 mx-auto sm:ml-3 text-slate-700 dark:text-slate-200 p-4 rounded-md font-semibold">
          {(!lastUsernames ||
            (lastUsernames && lastUsernames.length === 0)) && (
            <p className="text-center">No history</p>
          )}
          {canView &&
            lastUsernames &&
            lastUsernames.map((u, idx) => {
              return (
                <ProfileLastUsername
                  isLast={idx === lastUsernames.length - 1}
                  updateTime={u.updateTime}
                  username={u.username}
                  key={u.updateTime}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

const ProfileLastUsername = ({
  isLast,
  updateTime,
  username,
}: {
  username: string;
  updateTime: number;
  isLast: boolean;
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <p>{username}</p>
        <p
          className="hover:underline cursor-pointer"
          title={(() => {
            return new Date(updateTime).toLocaleDateString("default", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          })()}
        >
          {new Date(updateTime).toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
      {isLast === false && (
        <div className="w-full h-px bg-slate-500 my-2"></div>
      )}
    </div>
  );
};
