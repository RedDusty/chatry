import React from "react";
import SettingsChangeAvatar from "components/Settings/SettingsProfile/SettingsChangeAvatar";
import SettingsChangeUsername from "components/Settings/SettingsProfile/SettingsChangeUsername";
import IconArrow from "icons/IconArrow";

type userTabType = "avatar" | "username" | null;

const SettingsProfile = () => {
  const [userTab, setUserTab] = React.useState<userTabType>(null);

  return (
    <section className="mt-4 sm:ml-2 gap-2 flex flex-col">
      {userTab === null && (
        <div className="flex flex-row flex-wrap gap-4">
          <button
            className="text-2xl font-medium whitespace-nowrap hover:underline text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-indigo-200 text-center sm:text-left"
            onClick={() => {
              setUserTab("avatar");
            }}
          >
            Change avatar
          </button>
          <button
            className="text-2xl font-medium whitespace-nowrap hover:underline text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-indigo-200 text-center sm:text-left"
            onClick={() => {
              setUserTab("username");
            }}
          >
            Change username
          </button>
        </div>
      )}
      {userTab !== null && (
        <div>
          <button
            className="w-24 h-8 flex text-2xl font-medium whitespace-nowrap hover:underline text-slate-700 fill-slate-700 dark:text-slate-200 dark:fill-slate-200 hover:text-sky-600 hover:fill-sky-600 dark:hover:text-indigo-200 dark:hover:fill-indigo-200 text-center sm:text-left"
            onClick={() => {
              setUserTab(null);
            }}
          >
            <IconArrow rotate={"left"} />
            Back
          </button>
        </div>
      )}
      <div>
        {userTab === "avatar" && <SettingsChangeAvatar />}
        {userTab === "username" && <SettingsChangeUsername />}
      </div>
    </section>
  );
};

export default SettingsProfile;
