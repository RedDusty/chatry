import axios from "axios";
import { UserShortType } from "typings/UserTypes";

const users = new Map<string, UserShortType>();
(window as any).users = users

type callbackType = (v: UserShortType) => void;

export const getUser = async (uid: string | null, callback?: callbackType) => {
  if (uid === null || uid === "Loading") return null;
  
  if (users.has(uid)) {
    if (callback) callback(users.get(uid)!);

    return users.get(uid);
  } else {
    const res = await axios.get("/api/user/get", {
      method: "GET",
      params: {
        uid: uid,
      },
    });

    const user = res.data as UserShortType;
    users.set(user.uid, user);

    if (callback) callback(user);

    return user;
  }
};

export const setUser = (user: UserShortType | UserShortType[]) => {
  if (Array.isArray(user)) {
    user.forEach((u) => {
      users.set(u.uid, u);
    });
  } else {
    users.set(user.uid, user);
  }
};
