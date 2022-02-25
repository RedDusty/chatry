import React from "react";
import IconUser from "icons/IconUser";

const UserIcon = ({ avatar }: { avatar: string | null }) => {
  if (avatar && avatar.length !== 0) {
    return <img src={avatar} alt="icon" className="avatarRound" />;
  } else {
    return <IconUser />;
  }
};

export default UserIcon;
