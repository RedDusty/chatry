import React from "react";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import HeaderButton from "components/Utils/HeaderButton";
import IconSun from "icons/IconSun";
import IconMoon from "icons/IconMoon";
import IconKey from "icons/IconKey";
import IconUser from "icons/IconUser";
import IconPeople from "icons/IconPeople";
import IconSettings from "icons/IconSettings";
import IconBellRotated from "icons/IconBellRotated";
import IconLogout from "icons/IconLogout";
import axios from "axios";

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

  const logOut = () => {
    axios.post("/api/logout", {
      uid: uid,
    });
    const theme = localStorage.getItem("chatry-theme");
    localStorage.clear();
    localStorage.setItem("chatry-theme", theme || "white");
    dispatch({ type: "USER_SET", payload: null });
    dispatch({ type: "NOTIFICATIONS_SET", payload: null });
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
        Icon={<IconPeople />}
        link={"/people"}
        canUserPass={true}
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
      <HeaderButton
        Icon={<IconLogout />}
        link={logOut}
        canUserPass={false}
        isShow={false}
      />
    </section>
  );
};

export default Header;
