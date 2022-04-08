import React from "react";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import IconSun from "icons/IconSun";
import IconMoon from "icons/IconMoon";
import IconKey from "icons/IconKey";
import IconUser from "icons/IconUser";
import IconFriends from "icons/IconFriends";
import IconSettings from "icons/IconSettings";
import HeaderButton from "components/Utils/HeaderButton";
import IconBellRotated from "icons/IconBellRotated";

type HeaderType = {
  isNotifShow: boolean;
  setNotifShow: (v: boolean) => void;
};

const Header = ({ isNotifShow, setNotifShow }: HeaderType) => {
  const theme = useTypedSelector((s) => s.user.userSettings.theme);
  const uid = useTypedSelector((s) => s.user.uid);
  const subname = useTypedSelector((s) => s.user.subname);
  const dispatch = useTypedDispatch();

  const toggleTheme = () => {
    dispatch({
      type: "USER_THEME_SET",
      payload: theme === "white" ? "dark" : "white",
    });
  };

  const toggleNotifications = () => {
    setNotifShow(!isNotifShow);
    return !isNotifShow;
  };

  return (
    <section className="w-full sm:w-16 h-14 sm:h-full bg-slate-200 dark:bg-slate-800 flex flex-row items-center justify-evenly sm:justify-start sm:flex-col shrink-0 relative z-50">
      <HeaderButton
        Icon={theme === "white" ? <IconSun /> : <IconMoon />}
        link={toggleTheme}
        canUserPass={true}
        isShow={true}
      />
      <HeaderButton
        Icon={uid ? <IconUser /> : <IconKey />}
        link={uid ? `/user/${subname}` : "/auth"}
        canUserPass={true}
        isShow={true}
      />
      <HeaderButton
        Icon={<IconFriends />}
        link={"/friends"}
        canUserPass={false}
        isShow={true}
      />
      <HeaderButton
        Icon={<IconSettings />}
        link={"/settings"}
        canUserPass={false}
        isShow={true}
      />
      <HeaderButton
        Icon={<IconBellRotated />}
        link={toggleNotifications}
        canUserPass={false}
        isShow={true}
      />
    </section>
  );
};

export default Header;
