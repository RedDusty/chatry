import React from "react";
import ProfileInfo from "components/Profile/ProfileInfo";
import ProfileActions from "components/Profile/ProfileActions";
import { UserShortType } from "typings/UserTypes";
import axios from "axios";
import IconInfo from "icons/IconInfo";
import { Link } from "react-router-dom";
import { setUser } from "scripts/usersCache";
import { useTypedSelector } from "redux/useTypedRedux";

type errorType =
  | "NOT_FOUND"
  | "FORBIDDEN_PRIVATE"
  | "FORBIDDEN_FRIEND"
  | null
  | true;

const Profile = () => {
  const [pUser, setPUser] = React.useState<UserShortType | null>(null);
  const [error, setError] = React.useState<errorType>(null);

  const url = window.location.pathname.split("/").pop();
  const cu = useTypedSelector((s) => s.user.uid);

  React.useEffect(() => {
    setError(null);
    if (pUser?.uid !== window.location.pathname.split("/")[2]) {
      axios
        .get("/api/user", {
          params: {
            user: window.location.pathname.split("/")[2],
          },
        })
        .then((v) => {
          if (v.data) {
            if (v.data.error) setError(v.data.error);
            if (v.data.user) {
              setPUser(v.data.user);
              setUser(v.data.user);
            }
          }
        })
        .catch((e) => {
          setError(e.error || true);
        });
    }
  }, [pUser?.uid, url]);

  if (error === "NOT_FOUND" || error === "FORBIDDEN_PRIVATE") {
    return (
      <section className="flex flex-col flex-1 justify-start items-start p-4 sm:p-12 lg:p-16">
        <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-50 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center m-2 p-2 gap-2 lg:gap-6">
            <div className="w-16 h-16 lg:w-24 lg:h-24 fill-red-500">
              <IconInfo />
            </div>
            <h1 className="text-red-800 dark:text-red-200 text-xl sm:text-2xl lg:text-5xl">
              {error === "NOT_FOUND" && "This account does not exist!"}
              {error === "FORBIDDEN_PRIVATE" &&
                "You must be registered to view this profile!"}
            </h1>
          </div>
          <div className="m-2 p-2 flex flex-col gap-4 mt-4 sm:text-lg lg:text-xl text-zinc-900 dark:text-zinc-200">
            <p>
              If you're sure the account exists, try searching for it by
              <Link to={"/people?search="} className="link">
                &nbsp;name&nbsp;
              </Link>
              or entering an
              <Link to={"/people?search=id"} className="link">
                &nbsp;id&nbsp;
              </Link>
              .
            </p>
            <p>
              To
              <Link to={"/people?search=id"} className="link">
                &nbsp;search&nbsp;
              </Link>
              by id, put a "#" at the beginning of the search or click the link
              in that line.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cont flex-col justify-start items-start p-4 sm:p-12 lg:p-16">
      <ProfileInfo
        avatar={pUser ? pUser.avatar : undefined}
        username={pUser ? pUser.username : undefined}
        online={pUser ? pUser.online : false}
        uid={pUser ? pUser.uid : undefined}
        lastUsernames={pUser ? pUser.usernames : []}
        error={error}
      />
      {pUser && cu
        ? pUser.uid !== cu && (
            <ProfileActions uid={pUser!.uid} privacy={pUser!.privacy} />
          )
        : false}
      <div
        className={`h-px w-full px-4 ${
          error ? "bg-red-500 dark:bg-red-400" : "bg-sky-600 dark:bg-indigo-800"
        } mt-4`}
      ></div>
      {error === "FORBIDDEN_FRIEND" && (
        <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-50 rounded-xl mx-auto sm:ml-0 mt-4">
          <div className="flex flex-col sm:flex-row items-center m-2 p-2 gap-2 lg:gap-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 fill-red-500">
              <IconInfo />
            </div>
            <h1 className="text-red-800 dark:text-red-200 text-xl sm:text-2xl lg:text-3xl">
              You need to be a friend to view this profile.
            </h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
