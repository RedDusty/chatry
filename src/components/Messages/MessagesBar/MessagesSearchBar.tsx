import React from "react";
import IconSearch from "icons/IconSearch";
import IconCross from "icons/IconCross";

type MessagesSearchBarType = {
  chatSearch: string;
  setChatSearch: (v: string) => void;
};

const MessagesSearchBar = ({
  chatSearch,
  setChatSearch,
}: MessagesSearchBarType) => {
  return (
    <div className="w-full px-3 py-2">
      <div className="w-full bg-gray-100 dark:bg-gray-700 flex items-center z-20 rounded-md">
        <label htmlFor="friendsSearchInput" className="flex w-full cursor-text">
          <button
            className="w-12 h-12 bg-gray-200 dark:bg-gray-700 fill-gray-500 dark:fill-gray-400 rounded-tl-md rounded-bl-md shrink-0 cursor-text p-[10px]"
            onClick={() => {}}
          >
            <IconSearch />
          </button>
          <input
            type="text"
            id="friendsSearchInput"
            placeholder="Search..."
            onChange={(e) => {
              setChatSearch(e.target.value || "");
            }}
            value={chatSearch}
            className={`${
              false ? "" : " rounded-tr-md rounded-br-md"
            } bg-gray-200 dark:bg-gray-700 text-lg text-gray-700 dark:text-gray-200 w-full p-2`}
          />
          {chatSearch && chatSearch.length > 0 ? (
            <button
              className="w-12 h-12 bg-gray-200 hover:bg-sky-100 focus:bg-sky-200 dark:bg-gray-700 dark:hover:bg-indigo-900 dark:focus:bg-indigo-800 fill-gray-500 hover:fill-sky-500 focus:fill-sky-600 dark:fill-gray-400 dark:hover:fill-indigo-500 dark:focus:fill-indigo-400 rounded-tr-md rounded-br-md shrink-0 cursor-pointer p-[10px]"
              onClick={() => {
                setChatSearch("");
              }}
            >
              <IconCross />
            </button>
          ) : (
            <></>
          )}
        </label>
      </div>
      <div className="w-full h-px bg-gray-400 dark:bg-gray-500 mt-2"></div>
    </div>
  );
};

export default MessagesSearchBar;
