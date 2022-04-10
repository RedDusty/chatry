import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";

type PeopleTabsType = {
  btnHanlder: (btn: "search" | "friends" | "waiting") => void;
  isSearch: boolean;
};

const PeopleTabs = ({ btnHanlder, isSearch }: PeopleTabsType) => {
  const userUID = useTypedSelector((s) => s.user.uid);

  if (userUID) {
    return (
      <div className="mx-3 mt-2 mb-1">
        <div className="flex gap-x-2">
          <button
            className="bg-slate-500 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500 p-2 rounded-md font-semibold text-white"
            onClick={() => {
              btnHanlder("friends");
            }}
          >
            Friends
          </button>
          <button
            className="bg-green-600 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 p-2 rounded-md font-semibold text-white"
            onClick={() => {
              btnHanlder("waiting");
            }}
          >
            Waiting list
          </button>
        </div>
        {isSearch ? (
          <p className="mb-2 mt-1 p-2 rounded-md bg-sky-200 dark:bg-indigo-900 text-sky-600 dark:text-indigo-200 font-semibold max-w-min whitespace-nowrap">
            Search
          </p>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div className="mx-3 mt-2 mb-1">
      <p className="mb-2 mt-1 p-2 rounded-md bg-sky-200 dark:bg-indigo-900 text-sky-600 dark:text-indigo-200 font-semibold max-w-min whitespace-nowrap">
        Only search is available!
      </p>
    </div>
  );
};

export default PeopleTabs;
