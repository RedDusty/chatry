import { Dispatch } from "redux";
import {
  UserAvatarSetType,
  UserThemeSetType,
  UserDisplayNameSetType,
  UserVerifySetType,
  UserReducerType,
  UserSetType,
  UserSocketIDSetType,
} from "typings/UserTypes";

export const UserSet = (user: UserReducerType) => {
  return (dispatch: Dispatch<UserSetType>) => {
    dispatch({ type: "USER_SET", payload: user });
  };
};

export const UserUsernameSet = (username: string) => {
  return (dispatch: Dispatch<UserDisplayNameSetType>) => {
    dispatch({ type: "USER_DISPLAYNAME_SET", payload: username });
  };
};

export const UserAvatarSet = (avatar: string | null) => {
  return (dispatch: Dispatch<UserAvatarSetType>) => {
    dispatch({ type: "USER_AVATAR_SET", payload: avatar });
  };
};

export const UserThemeSet = (theme: "white" | "dark") => {
  return (dispatch: Dispatch<UserThemeSetType>) => {
    dispatch({ type: "USER_THEME_SET", payload: theme });
  };
};

export const UserVerifySet = (verify: boolean) => {
  return (dispatch: Dispatch<UserVerifySetType>) => {
    dispatch({ type: "USER_VERIFY_SET", payload: verify });
  };
};

export const UserSocketIDSet = (socketID: string) => {
  return (dispatch: Dispatch<UserSocketIDSetType>) => {
    dispatch({ type: "USER_SOCKETID_SET", payload: socketID });
  };
};
