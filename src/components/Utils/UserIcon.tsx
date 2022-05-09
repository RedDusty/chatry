import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";

const UserIcon = ({
  avatar,
  isOnline,
  removeDot,
  alt,
}: {
  avatar?: string | null;
  isOnline?: true | number | null;
  removeDot?: boolean;
  alt?: string;
}) => {
  const [isLoaded, setLoaded] = React.useState(true);
  const theme = useTypedSelector((s) => s.user.userSettings.theme);

  const rnt = () =>
    Math.floor(
      Math.random() *
        ((theme === "white" ? 225 : 150) - (theme === "white" ? 125 : 50) + 1) +
        (theme === "white" ? 125 : 50)
    );

  const rn = () => Math.floor(Math.random() * 361);

  const altExist = String(alt).charAt(0).toUpperCase() || "I";
  const onlineExist =
    removeDot === true ? null : isOnline !== null ? isOnline : 0;

  const onlineShow =
    onlineExist !== null &&
    onlineExist !== undefined &&
    typeof onlineExist !== "number";

  if (avatar && avatar.length !== 0 && isLoaded) {
    return (
      <>
        <img
          src={avatar}
          alt={altExist}
          className="avatarRound shrink-0"
          onError={() => {
            setLoaded(false);
          }}
        />
        {onlineShow ? (
          <div className="shrink-0 absolute -bottom-1 -right-1 bg-green-600 dark:bg-green-400 rounded-full border-[3px] border-solid border-slate-50 dark:border-slate-900 group-hover:border-slate-200 dark:group-hover:border-slate-700 w-4 h-4"></div>
        ) : (
          <></>
        )}
      </>
    );
  } else if (avatar === undefined) {
    return (
      <>
        <div className="animate-pulse bg-slate-400 dark:bg-slate-500 w-full h-full shrink-0 avatarRound"></div>
        {onlineShow ? (
          <div className="absolute -bottom-1 -right-1 bg-green-600 dark:bg-green-400 rounded-full border-[3px] border-solid border-slate-50 dark:border-slate-900 group-hover:border-slate-200 dark:group-hover:border-slate-700 w-4 h-4"></div>
        ) : (
          <></>
        )}
      </>
    );
  } else
    return (
      <div
        className="w-full h-full flex justify-center items-center relative shrink-0 avatarRound"
        style={{
          background: `linear-gradient(${rn()}deg, rgb(${rnt()}, ${rnt()}, ${rnt()}), rgb(${rnt()}, ${rnt()}, ${rnt()}))`,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 25 25">
          <text
            x="8"
            y="18"
            className="fill-slate-900 dark:fill-slate-50 select-none"
          >
            {altExist}
          </text>
        </svg>
        {onlineShow ? (
          <div className="absolute -bottom-1 -right-1 bg-green-600 dark:bg-green-400 rounded-full border-[3px] border-solid border-slate-50 dark:border-slate-900 group-hover:border-slate-200 dark:group-hover:border-slate-700 w-4 h-4"></div>
        ) : (
          <></>
        )}
      </div>
    );
};

export default UserIcon;
