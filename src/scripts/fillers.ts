import { UserShortType } from "typings/UserTypes";

export const userEmpty: UserShortType = {
  avatar: null,
  online: false,
  privacy: { twoside: "all", profile: "public" },
  uid: "Loading",
  username: "Loading",
};
