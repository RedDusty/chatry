import React from "react";
import ProfileInfo from "components/Profile/ProfileInfo";
import { UserReducerType } from "typings/UserTypes";
import axios from "axios";

const Profile = () => {
  const [pUser, setPUser] = React.useState<UserReducerType | null>(null);

  React.useEffect(() => {
    if (pUser?.uid !== window.location.pathname.split("/")[2]) {
      axios
        .get("/api/user", {
          params: {
            uid: window.location.pathname.split("/")[2],
          },
        })
        .then((v) => {
          if (v.data) {
            setPUser(v.data);
          }
        });
    }
  }, [setPUser, pUser?.uid]);

  return (
    <section className="flex flex-col flex-1 justify-start items-start p-4 sm:p-12 lg:p-16">
      <ProfileInfo
        avatar={pUser ? pUser.avatar : undefined}
        displayName={pUser ? pUser.displayName : undefined}
        friendsUID={pUser ? pUser.friendsUID : undefined}
        online={pUser ? pUser.online : undefined}
        uid={pUser ? pUser.uid : undefined}
      />
      <div className="h-px w-full px-4 bg-sky-600 dark:bg-indigo-800 mt-4"></div>
    </section>
  );
};

export default Profile;
