import React from "react";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import socket, { socketUsernameChange } from "socketio";

const SettingsChangeUsername = () => {
  const [username, setUsername] = React.useState("");
  const [rangeError, setRangeError] = React.useState(false);
  const [regexError, setRegexError] = React.useState(false);
  const [existError, setExistError] = React.useState(false);
  const cu = useTypedSelector((s) => s.user.username);
  const cs = useTypedSelector((s) => s.user.subname);
  const nu = useTypedSelector((s) => s.user.lastUsernameUpdate);
  const dispatch = useTypedDispatch();
  const lastUpdateCan = nu < new Date().getTime() - 1000 * 60 * 60 * 24 * 7;

  const checker = (text: string) => {
    if (existError === true) setExistError(false);
    if (text.length === 0) {
      setRegexError(false);
      setRangeError(false);
      setUsername("");
      return;
    }
    if (text.length < 4 || text.length > 16) {
      setRangeError(true);
    } else setRangeError(false);
    if (/^[a-zA-Z0-9<>^/|\\[\]{}()`'":;.,!?@№#$%&*-_=+]*$/g.test(text)) {
      setRegexError(false);
    } else setRegexError(true);
    setUsername(text);
  };

  const acceptHandler = () => {
    if (
      rangeError === false &&
      regexError === false &&
      existError === false &&
      lastUpdateCan === true
    ) {
      socketUsernameChange(username);
    }
  };

  React.useEffect(() => {
    socket.on("USERNAME_CHANGE", (data: any) => {
      if (data.text === "USERNAME_EXIST") {
        setExistError(true);
      } else if (data.text === "USERNAME_LENGTH") {
        setRangeError(true);
      } else if (data.text === "USERNAME_REGEX") {
        setRegexError(true);
      }
    });

    return () => {
      socket.off("USERNAME_CHANGE");
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-1 gap-4">
      <ul className="mx-auto sm:mx-0 list-disc pl-1">
        <li
          className={`${
            rangeError
              ? "text-red-700 dark:text-red-300"
              : "text-slate-700 dark:text-slate-300"
          } font-semibold`}
        >
          Username must be in the range of 4-16 characters
        </li>
        <li
          className={`${
            existError
              ? "text-red-700 dark:text-red-300"
              : "text-slate-700 dark:text-slate-300"
          } font-semibold`}
        >
          Username should not be occupied by anyone.
        </li>
        <li className="text-slate-700 dark:text-slate-300 font-semibold">
          Your past some messages may not have been changed.
        </li>
        <li className="text-slate-700 dark:text-slate-300 font-semibold">
          You can't advertise anything or write insults.
        </li>
        <li
          className={`${
            !lastUpdateCan
              ? "text-red-700 dark:text-red-300"
              : "text-slate-700 dark:text-slate-300"
          } font-semibold`}
        >
          You can change your username once every 7 days.
        </li>
        <li className="text-slate-700 dark:text-slate-300 font-semibold">
          Users will be able to see your 3 past usenames.
        </li>
        <li
          className={`${
            regexError
              ? "text-red-700 dark:text-red-300"
              : "text-slate-700 dark:text-slate-300"
          } font-semibold`}
        >
          {"English alphabet only. Allowed characters: "}{" "}
          <span className="font-medium text-sky-700 dark:text-indigo-300">
            {"<>^/|\\[]{}()`'\":;.,!?@№#$%&*-_=+ 1234567890"}
          </span>
          {". Space is not allowed."}
        </li>
      </ul>

      <div className="flex flex-col items-start">
        <p className="text-sky-700 dark:text-indigo-200 font-semibold">
          {lastUpdateCan ? "Enter a new username below:" : "Next update:"}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
          {!lastUpdateCan && <SettingsChangeUsernameNext nu={nu} />}
          {lastUpdateCan && (
            <>
              <input
                type="text"
                className="p-2 font-semibold text-black dark:text-white bg-slate-300 dark:bg-slate-600 border border-solid border-slate-500 hover:border-sky-500 dark:border-slate-400 dark:hover:border-indigo-400 rounded-lg"
                onChange={(e) => {
                  checker(e.target.value);
                }}
                value={username}
              />
              <button
                className={`${
                  rangeError || regexError
                    ? "cursor-not-allowed bg-red-600 dark:bg-red-800 hover:bg-red-500 dark:hover:bg-red-700"
                    : "bg-green-600 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-700"
                } h-10 border border-solid border-black px-3 py-1 rounded-md text-white font-semibold`}
                onClick={acceptHandler}
              >
                Accept
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-slate-600 dark:text-slate-300">
        <p>{`${cu} ${lastUpdateCan ? "=> " + (username || cu) : ""}`}</p>
        <p>{`${window.location.origin}/user/${cs} ${
          lastUpdateCan
            ? "=>" +
              window.location.origin +
              "/user/" +
              String(username || cs).toLocaleLowerCase()
            : ""
        }`}</p>
      </div>
    </div>
  );
};

export default SettingsChangeUsername;

const SettingsChangeUsernameNext = ({ nu }: { nu: number }) => {
  const date = new Date(nu);
  return (
    <div className="p-2 font-semibold text-black dark:text-white bg-slate-300 dark:bg-slate-600 border border-solid border-slate-500 dark:border-slate-400 rounded-lg">
      {date.toLocaleDateString("default", {month: 'long', weekday: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}
    </div>
  );
};
