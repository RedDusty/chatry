import React from "react";
import IconCross from "icons/IconCross";
import IconSearch from "icons/IconSearch";
import { searchListType } from 'typings/cacheTypes';

type PeopleSearchBarType = {
  btnHanlder: (btn: searchListType) => void;
  disableSearchHandler: () => void;
  setQuery: (v: string) => void;
  query: string;
  isSearch: boolean;
};

const PeopleSearchBar = ({
  btnHanlder,
  disableSearchHandler,
  isSearch,
  query,
  setQuery,
}: PeopleSearchBarType) => {
  return (
    <div className="w-full h-16 flex justify-center items-center">
      <div className="m-3 w-full bg-gray-100 dark:bg-gray-700 flex items-center z-20 rounded-md">
        <label htmlFor="friendsSearchInput" className="flex w-full cursor-text">
          <button
            className="w-12 h-12 bg-gray-200 hover:bg-sky-100 focus:bg-sky-200 dark:bg-gray-700 dark:hover:bg-indigo-900 dark:focus:bg-indigo-800 fill-gray-500 hover:fill-sky-500 focus:fill-sky-600 dark:fill-gray-400 dark:hover:fill-indigo-500 dark:focus:fill-indigo-400 rounded-tl-md rounded-bl-md shrink-0 cursor-pointer p-[10px]"
            onClick={() => {
              btnHanlder("search");
            }}
          >
            <IconSearch />
          </button>
          <input
            type="text"
            id="friendsSearchInput"
            placeholder="Search..."
            onKeyPress={(e) => {
              if (e.key === "Enter") btnHanlder("search");
            }}
            onChange={(e) => {
              setQuery(e.target.value || "");
            }}
            value={query}
            className={`${
              isSearch ? "" : " rounded-tr-md rounded-br-md"
            } bg-gray-200 dark:bg-gray-700 text-lg text-gray-700 dark:text-gray-200 w-full p-2`}
          />
          {isSearch ? (
            <button
              className="w-12 h-12 bg-gray-200 hover:bg-sky-100 focus:bg-sky-200 dark:bg-gray-700 dark:hover:bg-indigo-900 dark:focus:bg-indigo-800 fill-gray-500 hover:fill-sky-500 focus:fill-sky-600 dark:fill-gray-400 dark:hover:fill-indigo-500 dark:focus:fill-indigo-400 rounded-tr-md rounded-br-md shrink-0 cursor-pointer p-[10px]"
              onClick={disableSearchHandler}
            >
              <IconCross />
            </button>
          ) : (
            <></>
          )}
        </label>
      </div>
    </div>
  );
};

export default PeopleSearchBar;
