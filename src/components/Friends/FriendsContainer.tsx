import React from "react";
import axios from "axios";
import { UserShortType } from "typings/UserTypes";
import { useTypedSelector } from "redux/useTypedRedux";
import Friends from "components/Friends/Friends";
import { useSearchParams } from "react-router-dom";

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

const FriendsContainer = () => {
  const [userList, setUserList] = React.useState<UserShortType[]>([]);
  const [isSearch, setSearch] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isFetching, setFetching] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
    if (searchParams.has("search")) {
      setSearch(true);
      if (searchParams.get("search") === "id") {
        setQuery("#");
      }
      searchParams.delete("search");
      setSearchParams("", { replace: true });
    }
    setFetching(true);
    searcher(searchFriends(u.friendsUID, u.uid!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnHanlder = (btn: "search" | "friends" | "waiting") => {
    setFetching(true);
    setQuery("");
    switch (btn) {
      case "friends":
        searcher(searchFriends(u.friendsUID, u.uid!));
        setSearch(false);
        break;
      case "search":
        setSearch(true);
        searcher(searchUsers(query, u.uid!));
        break;
      case "waiting":
        searcher(searchFriends(u.waitingsUID, u.uid!));
        setSearch(false);
        break;
      default:
        searcher(searchFriends(u.friendsUID, u.uid!));
        setSearch(false);
        break;
    }
  };

  const disableSearchHandler = () => {
    setFetching(true);
    searcher(searchFriends(u.friendsUID, u.uid!));
    setSearch(false);
  };

  return (
    <Friends
      btnHanlder={btnHanlder}
      disableSearchHandler={disableSearchHandler}
      isFetching={isFetching}
      isSearch={isSearch}
      query={query}
      setQuery={setQuery}
      userList={userList}
    />
  );
};

export default FriendsContainer;
