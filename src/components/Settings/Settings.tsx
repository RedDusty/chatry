import React from "react";
import SettingsProfile from "components/Settings/SettingsProfile";

const Settings = () => {
  return (
    <section className="flex flex-1 justify-start flex-col p-4">
      <div className="max-w-min mx-auto sm:mx-0">
        <p className="text-3xl font-medium whitespace-nowrap text-sky-800 dark:text-indigo-300">
          User settings
        </p>
        <div className="h-0.5 bg-sky-600 dark:bg-indigo-300 mt-2"></div>
      </div>
      <SettingsProfile />
      <div className="h-px w-full px-4 bg-sky-600 dark:bg-indigo-300 mt-4"></div>
    </section>
  );
};

export default Settings;
