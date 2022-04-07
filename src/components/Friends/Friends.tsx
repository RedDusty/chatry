import React from "react";
import IconSearch from "icons/IconSearch";
import IconCross from "icons/IconCross";
import { UserShortType } from "typings/UserTypes";
import axios from "axios";
import { useTypedSelector } from "redux/useTypedRedux";
import FriendCard from "components/Utils/FriendCard";
import IconLoading from "icons/IconLoading";

const searchFriends = async (friendsUID: string[], userUID: string) => {
  const res = await axios.post("/api/friends", {
    friendsUID: friendsUID,
    userUID: userUID,
  });

  if (res.status === 200) {
    return res.data as UserShortType[];
  }
};

const searchUsers = async (query: string, userUID: string) => {
  const searchBy = () => {
    if (query.startsWith("#uid:")) return "uid";
    if (query.startsWith("#name:")) return "displayName";

    return "subname";
  };

  const querySlice = () => {
    if (searchBy() === "uid") return query.substring(5);
    if (searchBy() === "displayName") return query.substring(6);

    return query;
  };

  const res = await axios.post("/api/search/users", {
    key: searchBy(),
    value: querySlice(),
    userUID,
  });

  if (res.status === 200) {
    return res.data as UserShortType[];
  }
};

const Friends = () => {
  const [userList, setUserList] = React.useState<UserShortType[]>([]);
  const [isSearch, setSearch] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isFetching, setFetching] = React.useState(false);

  const u = useTypedSelector((s) => s.user);

  const searcher = (func: Promise<UserShortType[] | undefined>) => {
    func
      .then((v) => {
        if (v) setUserList(v);
      })
      .catch(() => {
        setUserList([]);
      })
      .finally(() => setFetching(false));
  };

  React.useEffect(() => {
    setFetching(true);
    searcher(searchFriends(u.friendsUID, u.uid!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchHandler = () => {
    setSearch(true);
    setFetching(true);
    searcher(searchUsers(query, u.uid!));
  };

  const disableSearchHandler = () => {
    setFetching(true);
    searcher(searchFriends(u.friendsUID, u.uid!));
    setSearch(false);
  };

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
              onClick={searchHandler}
            >
              <IconSearch />
            </button>
            <input
              type="text"
              id="friendsSearchInput"
              placeholder="Search..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') searchHandler()
              }}
              onChange={(e) => {
                setQuery(e.target.value || "");
              }}
              value={query}
              className="bg-gray-200 dark:bg-gray-700 text-lg text-gray-700 dark:text-gray-200 w-full p-2 rounded-tr-md rounded-br-md"
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
