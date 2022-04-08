import React from "react";
import IconSearch from "icons/IconSearch";
import IconCross from "icons/IconCross";
import FriendCard from "components/Utils/FriendCard";
import IconLoading from "icons/IconLoading";
import { UserShortType } from "typings/UserTypes";

type FriendsComponentType = {
  btnHanlder: (btn: "search" | "friends" | "waiting") => void;
  disableSearchHandler: () => void;
  setQuery: (v: string) => void;
  query: string;
  isSearch: boolean;
  isFetching: boolean;
  userList: UserShortType[];
};

const Friends = ({
  btnHanlder,
  disableSearchHandler,
  setQuery,
  query,
  isFetching,
  isSearch,
  userList,
}: FriendsComponentType) => {
  return (
    <section className="flex flex-1 justify-start flex-col">
      <div className="w-full h-16 flex justify-center items-center">
        <div className="m-3 w-full bg-gray-100 dark:bg-gray-700 flex items-center z-20 rounded-md">
          <label
            htmlFor="friendsSearchInput"
            className="flex w-full cursor-text"
          >
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
      <div className="mx-3 mt-2 mb-1 flex gap-x-2">
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
        <p className="mx-3 mb-2 mt-1 p-2 rounded-md bg-sky-200 text-sky-600 font-semibold max-w-min">
          Search
        </p>
      ) : (
        <></>
      )}
      <div className="flex flex-col flex-1">
        {isFetching ? (
          <div className="w-[24vw] h-[24vw] m-auto">
            <IconLoading />
          </div>
        ) : userList.length ? (
          userList.map((user, idx) => {
            return <FriendCard user={user} key={user.uid + idx} />;
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center flex-col">
            <h3 className="text-4xl text-lighter">It seems empty...</h3>
            <h4 className="text-2xl text mt-4">
              Use the search and find people!
            </h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default Friends;
