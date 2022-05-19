import React from "react";
import InputChecker from "components/Utils/InputChecker";
import { useTypedSelector } from "redux/useTypedRedux";
import { UserPrivacyType, ValueOf } from "typings/UserTypes";
import { socketPrivacy } from "socketio";

type privacySettings = {
  privacyTwoSide: boolean;
  privacyProfile: boolean;
};

type privacyProfileType = "public" | "private" | "friends";
const privacyProfileText: privacyProfileType[] = [
  "public",
  "private",
  "friends",
];

const SettingsPrivacy = () => {
  const privacy = useTypedSelector((s) => s.user.privacy);
  const [isChangedSettings, setChangedSettings] = React.useState(false);
  const [privacySettings, setPrivacySettings] = React.useState<privacySettings>(
    {
      privacyTwoSide: false,
      privacyProfile: false,
    }
  );
  const [privacyTwoSide, setPrivacyTwoSide] = React.useState(privacy.twoside);
  const [privacyProfile, setPrivacyProfile] =
    React.useState<privacyProfileType>(privacy.profile);

  const settingChanged = (
    k: keyof UserPrivacyType,
    v: ValueOf<UserPrivacyType>
  ) => {
    setPrivacySettings((prev) => {
      const changed = { ...prev, [k]: privacy[k] !== v };
      if (Object.values(changed).includes(true)) {
        setChangedSettings(true);
      } else {
        setChangedSettings(false);
      }
      return changed;
    });
  };

  const messagesPrivacyHandler = (v: boolean) => {
    settingChanged("twoside", v === true ? "friends" : "all");
    if (v === true) setPrivacyTwoSide("friends");
    if (v === false) setPrivacyTwoSide("all");
  };

  const profilePrivacyHandler = (v: "public" | "private" | "friends") => {
    settingChanged("profile", v);
    setPrivacyProfile(v);
  };

  const saveSettingsHandler = () => {
    if (isChangedSettings) {
      socketPrivacy({ profile: privacyProfile, twoside: privacyTwoSide });
    }
  };

  React.useEffect(() => {
    setPrivacyTwoSide(privacy.twoside);
    setPrivacyProfile(privacy.profile);
    setPrivacySettings({ privacyProfile: false, privacyTwoSide: false });
    setChangedSettings(false);
  }, [privacy]);

  return (
    <div className="sm:ml-2 gap-4 flex flex-col">
      <div>
        <p className="text-slate-600 dark:text-slate-300">
          You have{" "}
          <span className={!isChangedSettings ? "text-green-600" : ""}>
            {!isChangedSettings && "not"}
          </span>{" "}
          <span
            className={isChangedSettings ? "text-red-600" : "text-green-600"}
          >
            changed
          </span>{" "}
          <span>{isChangedSettings ? "the" : "privacy"}</span> settings.
        </p>
        <button
          className={`${
            isChangedSettings
              ? "bg-green-300 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-900 dark:text-green-100"
              : "bg-red-300 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-900 dark:text-red-100 cursor-not-allowed"
          } px-2 py-1 font-semibold mt-2 rounded-md`}
          onClick={saveSettingsHandler}
        >
          Save settings
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-slate-600 dark:text-slate-300">
          <span className={"text-sky-600 dark:text-indigo-400"}>
            {privacyTwoSide === "friends"
              ? "Only your friends "
              : "Absolutely everyone "}
          </span>
          <span>will be able to write to you.</span>
        </p>
        <InputChecker
          ifChecked="Friends"
          ifNotChecked="All"
          callback={messagesPrivacyHandler}
          defaultValue={privacyTwoSide === "friends"}
          id={"privacy-twoside"}
        />
      </div>
      <div className="w-1/2 sm:w-96 h-px bg-sky-500 dark:bg-indigo-400"></div>
      <div className="flex flex-col gap-2">
        <p className="text-slate-600 dark:text-slate-300">
          <span className={"text-sky-600 dark:text-indigo-400"}>
            {privacyProfile === "public" && "Everyone "}
            {privacyProfile === "private" && "Registered users "}
            {privacyProfile === "friends" && "Only your friends "}
          </span>
          <span>can see your profile.</span>
        </p>
        <div className="flex gap-2">
          {privacyProfileText.map((v, idx) => {
            return (
              <button
                className={`${
                  privacyProfile === v
                    ? "bg-green-300 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700 text-green-900 dark:text-green-200"
                    : "bg-sky-300 dark:bg-indigo-800 hover:bg-sky-200 dark:hover:bg-indigo-700 text-sky-900 dark:text-indigo-200"
                } rounded-md px-2 py-1 capitalize`}
                key={v + idx}
                onClick={() => profilePrivacyHandler(v)}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsPrivacy;
