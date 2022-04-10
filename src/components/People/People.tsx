import React from "react";
import UserCard from "components/Utils/UserCard/UserCard";
import IconLoading from "icons/IconLoading";
import { UserShortType } from "typings/UserTypes";
import PeopleSearchBar from "components/People/PeopleSearchBar";
import PeopleTabs from "components/People/PeopleTabs";

type PeopleComponentType = {
  btnHanlder: (btn: "search" | "friends" | "waiting") => void;
  disableSearchHandler: () => void;
  setQuery: (v: string) => void;
  query: string;
  isSearch: boolean;
  isFetching: boolean;
  userList: UserShortType[];
};

const People = ({
  btnHanlder,
  disableSearchHandler,
  setQuery,
  query,
  isFetching,
  isSearch,
  userList,
}: PeopleComponentType) => {
  return (
    <section className="flex flex-1 justify-start flex-col">
      <PeopleSearchBar
        btnHanlder={btnHanlder}
        disableSearchHandler={disableSearchHandler}
        isSearch={isSearch}
        query={query}
        setQuery={setQuery}
      />
      <PeopleTabs btnHanlder={btnHanlder} isSearch={isSearch} />
      <div className="flex flex-col flex-1">
        {isFetching ? (
          <div className="w-[24vw] h-[24vw] m-auto">
            <IconLoading />
          </div>
        ) : userList.length ? (
          userList.map((user, idx) => {
            return <UserCard user={user} key={user.uid + idx} />;
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

export default People;