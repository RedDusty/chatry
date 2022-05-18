import React from "react";
import axios from "axios";
import { UserShortType } from "typings/UserTypes";
import { useTypedSelector } from "redux/useTypedRedux";
import People from "components/People/People";
import { useSearchParams } from "react-router-dom";
import { setUser } from "scripts/usersCache";

const searchFriends = async (
  friendsUID: string[],
  userUID: string,
  list: "friends" | "waitings"
) => {
  const res = await axios.post("/api/search/friends", {
    friendsUID: friendsUID,
    userUID: userUID,
    list: list,
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

const PeopleContainer = () => {
  const [userUIDList, setUserUIDList] = React.useState<string[]>([]);
  const [isSearch, setSearch] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isFetching, setFetching] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const u = useTypedSelector((s) => s.user);

  const searcher = (func: Promise<UserShortType[] | undefined>) => {
    func
      .then((v) => {
        if (v) {
          const uids = v.map((u) => u.uid);
          setUser(v);
          setUserUIDList(uids);
        }
      })
      .catch(() => {
        setUserUIDList([]);
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
    if (u.uid) {
      setFetching(true);
      if (searchParams.has("waitings")) {
        searchParams.delete("search");
        setSearchParams("", { replace: true });
        searcher(searchFriends(u.waitingsUID, u.uid, "friends"));
      } else {
        searcher(searchFriends(u.friendsUID, u.uid, "friends"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u.uid, u.waitingsUID, u.friendsUID]);

  const btnHanlder = (btn: "search" | "friends" | "waiting") => {
    setFetching(true);
    switch (btn) {
      case "friends":
        u.uid && searcher(searchFriends(u.friendsUID, u.uid, "friends"));
        setSearch(false);
        break;
      case "search":
        setSearch(true);
        searcher(searchUsers(query, u.uid!));
        break;
      case "waiting":
        u.uid && searcher(searchFriends(u.waitingsUID, u.uid, "waitings"));
        setSearch(false);
        break;
      default:
        u.uid && searcher(searchFriends(u.friendsUID, u.uid, "friends"));
        setSearch(false);
        break;
    }
  };

  const disableSearchHandler = () => {
    setFetching(u.uid ? true : false);
    setSearch(false);
    setQuery("");
    u.uid === null && setUserUIDList([]);
    u.uid && searcher(searchFriends(u.friendsUID, u.uid, "friends"));
  };

  return (
    <People
      btnHanlder={btnHanlder}
      disableSearchHandler={disableSearchHandler}
      isFetching={isFetching}
      isSearch={isSearch}
      query={query}
      setQuery={setQuery}
      userUIDList={userUIDList}
    />
  );
};

export default PeopleContainer;
