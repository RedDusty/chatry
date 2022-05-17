import React from "react";
import ProfileInfo from "components/Profile/ProfileInfo";
import { UserProileType } from "typings/UserTypes";
import axios from "axios";
import IconInfo from "icons/IconInfo";
import { Link } from "react-router-dom";

const Profile = () => {
  const [pUser, setPUser] = React.useState<UserProileType | null>(null);
  const [isError, setError] = React.useState<boolean>(false);

  const url = window.location.pathname.split("/").pop();

  React.useEffect(() => {
    setError(false);
    if (pUser?.uid !== window.location.pathname.split("/")[2]) {
      axios
        .get("/api/user", {
          params: {
            user: window.location.pathname.split("/")[2],
          },
        })
        .then((v) => {
          if (v.data) {
            setPUser(v.data);
          }
        })
        .catch((e) => {
          setError(true);
        });
    }
  }, [setPUser, pUser?.uid, url]);

  if (isError) {
    return (
      <section className="flex flex-col flex-1 justify-start items-start p-4 sm:p-12 lg:p-16">
        <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-50 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center m-2 p-2 gap-2 lg:gap-6">
            <div className="w-16 h-16 lg:w-24 lg:h-24 fill-red-500">
              <IconInfo />
            </div>
            <h1 className="text-red-800 dark:text-red-200 text-xl sm:text-2xl lg:text-5xl">
              This account does not exist!
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
        online={pUser ? pUser.online : undefined}
        uid={pUser ? pUser.uid : undefined}
        lastUsernames={pUser ? pUser.usernames : []}
      />
      <div className="h-px w-full px-4 bg-sky-600 dark:bg-indigo-800 mt-4"></div>
    </section>
  );
};

export default Profile;
