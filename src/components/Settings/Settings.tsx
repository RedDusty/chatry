import React from "react";
import SettingsProfile from "components/Settings/SettingsProfile";
import SettingsPrivacy from "components/Settings/SettingsSingle/SettingsPrivacy";

const Settings = () => {
  return (
    <section className="cont justify-start flex-col p-4 gap-8">
      <div className="flex flex-col gap-4">
        <div className="max-w-min mx-auto sm:mx-0">
          <p className="text-3xl font-medium whitespace-nowrap text-sky-800 dark:text-indigo-300">
            User settings
          </p>
          <div className="h-0.5 bg-sky-600 dark:bg-indigo-300"></div>
        </div>
        <SettingsProfile />
        <div className="h-px w-full px-4 bg-sky-600 dark:bg-indigo-300"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="max-w-min mx-auto sm:mx-0">
          <p className="text-3xl font-medium whitespace-nowrap text-sky-800 dark:text-indigo-300">
            User privacy
          </p>
          <div className="h-0.5 bg-sky-600 dark:bg-indigo-300"></div>
        </div>
        <SettingsPrivacy />
      </div>
      <div className="h-px w-full px-4 bg-sky-600 dark:bg-indigo-300"></div>
    </section>
  );
};

export default Settings;
