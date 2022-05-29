import React from "react";
import axios from "axios";
import { UserShortType } from "typings/UserTypes";
import { useTypedSelector } from "redux/useTypedRedux";
import People from "components/People/People";
import { useSearchParams } from "react-router-dom";
import { setUser } from "scripts/usersCache";
import { searchListType } from "typings/cacheTypes";

const searchUsers = async (
  value: string,
  userUID: string | null,
  list: searchListType
) => {
  const searchBy = () => {
    if (value.startsWith("#uid:")) return "uid";
    if (value.startsWith("#name:")) return "username";

    return "subname";
  };

  const querySlice = () => {
    if (searchBy() === "uid") return value.substring(5);
    if (searchBy() === "username") return value.substring(6);

    return value;
  };

  const res = await axios.post("/api/search/users", {
    key: searchBy(),
    value: querySlice(),
    userUID,
    list,
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
          const uids = v.map((u) => {
            setUser(u);
            return u.uid;
          });

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
        u.uid && searcher(searchUsers(query, u.uid, "waitings"));
      } else {
        u.uid && searcher(searchUsers(query, u.uid, "friends"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u.uid, u.waitingsUID, u.friendsUID]);

  const btnHanlder = (btn: searchListType) => {
    setFetching(true);
    switch (btn) {
      case "friends":
        u.uid && searcher(searchUsers(query, u.uid, "friends"));
        setSearch(false);
        break;
      case "search":
        setSearch(true);
        searcher(searchUsers(query, u.uid, "search"));
        break;
      case "waitings":
        u.uid && searcher(searchUsers(query, u.uid, "waitings"));
        setSearch(false);
        break;
      case "online":
        setSearch(true);
        searcher(searchUsers(query, u.uid, "online"));
        break;
      default:
        u.uid && searcher(searchUsers(query, u.uid, "friends"));
        setSearch(false);
        break;
    }
  };

  const disableSearchHandler = () => {
    setFetching(u.uid ? true : false);
    setSearch(false);
    setQuery("");
    u.uid === null && setUserUIDList([]);
    u.uid && searcher(searchUsers(query, u.uid, "friends"));
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
