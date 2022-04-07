import React from "react";
import IconUser from "icons/IconUser";

const UserIcon = ({ avatar }: { avatar: string | null | undefined }) => {
  if (avatar && avatar.length !== 0) {
    return <img src={avatar} alt="icon" className="avatarRound" />;
  } else if (avatar === undefined) {
    return (
      <div className="animate-pulse bg-slate-400 dark:bg-slate-500 w-full h-full"></div>
    );
  } else
    return (
      <div className="fill-zinc-700 dark:fill-zinc-300">
        <IconUser />
      </div>
    );
};

export default UserIcon;
