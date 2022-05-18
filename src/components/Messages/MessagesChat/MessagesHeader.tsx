import React from "react";
import UserIcon from "components/Utils/UserIcon";
import MessagesHeaderActions from "components/Messages/MessagesChat/MessagesChatSub/MessagesHeaderActions";
import IconCross from "icons/IconCross";
import IconDots from "icons/IconDots";
import { useTypedSelector } from "redux/useTypedRedux";
import { setCurrentDialog } from "scripts/currentDialog";
import { ChatType } from "typings/cacheTypes";
import { useNavigate } from "react-router-dom";
import { UserShortType } from 'typings/UserTypes';
import { getUser } from 'scripts/usersCache';

const MessagesHeader = ({ c }: { c: ChatType }) => {
  const [user, setUser] = React.useState<UserShortType | null>(null);
  const [chatAvatar, setChatAvatar] = React.useState<string | null>("");
  const [chatName, setChatName] = React.useState("");
  const [isShowActions, setShowActions] = React.useState(false);
  const navigate = useNavigate();

  const theme = useTypedSelector((s) => s.user.userSettings.theme);
  const cu = useTypedSelector((s) => s.user.uid);

  const userUID = c.usersUID.filter((u) => u !== cu)[0];

  React.useEffect(() => {
    if (c.chatType === "two-side") {
      getUser(userUID ? userUID : null, setUser).then((v) => {
        if (v) {
          setChatName(v.username);
          setChatAvatar(v.avatar)
        }
      });
    } else {
      setChatName(c.name);
      setChatAvatar(c.avatar)
    }
  }, [c, userUID]);

  const closeDialogHandler = () => {
    setCurrentDialog(null);
    navigate({ search: "".toString() });
  };

  const toggleDialogHandler = () => {
    setShowActions(!isShowActions);
  };

  const boxShadow =
    theme === "white" ? "rgb(241, 247, 255)" : "rgb(10, 21, 39)";

  return (
    <div
      className={`w-full ${
        isShowActions ? "h-32" : "h-16"
      } relative z-20 transition-all duration-100 px-2 sm:px-4 bg-slate-200 dark:bg-slate-800 border-0 border-b border-solid border-slate-400 dark:border-slate-500 flex flex-col justify-between gap-2`}
      style={{
        boxShadow: "0 8px 36px 8px " + boxShadow,
      }}
    >
      {isShowActions && <MessagesHeaderActions c={c} />}
      <div className="w-full h-16 flex items-center justify-between">
        <div className="w-6 lg:w-16 shrink-0">
          <button
            className="hidden lg:block font-semibold text-lg cursor-pointer bg-slate-300 hover:bg-sky-300 dark:bg-slate-700 dark:hover:bg-indigo-800 text-slate-600 dark:text-slate-400 hover:text-sky-700 dark:hover:text-indigo-300 px-2 py-1 rounded-lg"
            onClick={closeDialogHandler}
          >
            Close
          </button>
          <div
            className="lg:hidden w-6 h-6 cursor-pointer fill-slate-600 dark:fill-slate-400 hover:fill-sky-500 dark:hover:fill-indigo-500"
            onClick={closeDialogHandler}
          >
            <IconCross />
          </div>
        </div>
        <div className="w-[calc(100%-100px)] sm:w-80 md:w-72 lg:w-96 flex items-center justify-center gap-2 sm:gap-4">
          <div className="w-12 h-12 shrink-0 relative">
            <UserIcon
              avatar={chatAvatar}
              isOnline={user ? user.online : null}
              alt={chatName}
            />
          </div>
          <p className=" text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 truncate">
            {chatName}
          </p>
        </div>
        <div className="w-9 lg:w-20 shrink-0">
          <button
            className="hidden lg:block font-semibold text-lg cursor-pointer bg-slate-300 hover:bg-sky-300 dark:bg-slate-700 dark:hover:bg-indigo-800 text-slate-600 dark:text-slate-400 hover:text-sky-700 dark:hover:text-indigo-300 px-2 py-1 rounded-lg"
            onClick={toggleDialogHandler}
          >
            Actions
          </button>
          <div
            className="lg:hidden w-9 h-w-9 cursor-pointer fill-slate-600 dark:fill-slate-400 hover:fill-sky-500 dark:hover:fill-indigo-500"
            onClick={toggleDialogHandler}
          >
            <IconDots />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesHeader;
