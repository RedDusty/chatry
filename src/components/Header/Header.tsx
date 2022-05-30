import React from "react";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import HeaderButton from "components/Utils/HeaderButton";
import IconSun from "icons/IconSun";
import IconMoon from "icons/IconMoon";
import IconKey from "icons/IconKey";
import IconUser from "icons/IconUser";
import IconPeople from "icons/IconPeople";
import IconSettings from "icons/IconSettings";
import IconLogout from "icons/IconLogout";
import IconMessages from "icons/IconMessages";
import HeaderNotification from "components/Header/HeaderNotification";
import axios from "axios";
import { setCurrentDialog } from "scripts/currentDialog";

type HeaderType = {
  isNotifShow: boolean;
  toggleNotifications: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const Header = ({ isNotifShow, toggleNotifications }: HeaderType) => {
  const username = useTypedSelector((s) => s.user.username);
  const theme = useTypedSelector((s) => s.user.userSettings.theme);
  const uid = useTypedSelector((s) => s.user.uid);
  const dispatch = useTypedDispatch();

  const toggleTheme = () => {
    dispatch({
      type: "USER_THEME_SET",
      payload: theme === "white" ? "dark" : "white",
    });
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
        link={uid ? `/user/${String(username).toLowerCase()}` : "/auth"}
        canUserPass={true}
        isShow={true}
      />
      <HeaderButton
        Icon={<IconMessages />}
        link={"/messages"}
        canUserPass={false}
        isShow={true}
        addFunctional={() => {
          setCurrentDialog(null);
        }}
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
      <HeaderNotification
        toggleNotifications={toggleNotifications}
        isNotifShow={isNotifShow}
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
