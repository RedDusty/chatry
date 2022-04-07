import React from "react";
import SettingsChangeAvatar from "components/Settings/SettingsProfile/SettingsChangeAvatar";

const SettingsProfile = () => {
  return (
    <section className="mt-4 sm:ml-2 flex flex-col">
      <div>
        <p className="text-2xl font-medium whitespace-nowrap text text-center sm:text-left">
          Change avatar
        </p>
        <SettingsChangeAvatar />
      </div>
    </section>
  );
};

export default SettingsProfile;
