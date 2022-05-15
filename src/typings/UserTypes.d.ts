export type USER_USERNAME_SET = "USER_USERNAME_SET";
export type USER_AVATAR_SET = "USER_AVATAR_SET";
export type USER_THEME_SET = "USER_THEME_SET";
export type USER_MESSAGE_VIEW_SET = "USER_MESSAGE_VIEW_SET";
export type USER_UID_SET = "USER_UID_SET";
export type USER_VERIFY_SET = "USER_VERIFY_SET";
export type USER_SET = "USER_SET";
export type USER_SOCKETID_SET = "USER_SOCKETID_SET";
export type USER_LIST_UIDS_SET = "USER_LIST_UIDS_SET";
export type USER_LIST_UIDS_REMOVE = "USER_LIST_UIDS_REMOVE";

type UserPrivacyType = {
  profile: "public" | "private";
  messages: "all" | "friends";
};

type UserSettingsType = {
  theme: "white" | "dark";
  messageView: "separately" | "left";
};

export type UserReducerType = {
  username: string;
  email: string;
  uid: string | null;
  avatar: string | null;
  online: true | number;
  userSettings: UserSettingsType;
  privacy: UserPrivacyType;
  registerDate: number;
  friendsUID: string[];
  ignoresUID: string[];
  waitingsUID: string[];
  subname: string;
  verified: boolean;
  socketID: string | null;
  banned: boolean;
};

type ValueOf<T> = T[keyof T];

export type UserShortType = {
  username: string;
  uid: string;
  online: true | number;
  avatar: string | null;
  privacy: UserPrivacyType;
  subname: string;
};

type UserSetType = {
  type: USER_SET;
  payload: UserReducerType | null;
};

type UserUsernameSetType = {
  type: USER_USERNAME_SET;
  payload: string;
};

type UserAvatarSetType = {
  type: USER_AVATAR_SET;
  payload: string | null;
};

type UserThemeSetType = {
  type: USER_THEME_SET;
  payload: "white" | "dark";
};

type UserMessageViewSetType = {
  type: USER_MESSAGE_VIEW_SET;
  payload: "separately" | "left";
};

type UserUIDSetType = {
  type: USER_UID_SET;
  payload: string | null;
};

type UserVerifySetType = {
  type: USER_VERIFY_SET;
  payload: boolean;
};

type UserSocketIDSetType = {
  type: USER_SOCKETID_SET;
  payload: string;
};

type UserListUIDSSetType = {
  type: USER_LIST_UIDS_SET;
  payload: {
    list: "friends" | "waitings" | "ignores";
    uids: string[] | string;
  };
};

type UserListUIDSRemoveType = {
  type: USER_LIST_UIDS_REMOVE;
  payload: {
    list: "friends" | "waitings" | "ignores";
    uid: string;
  };
};

type UserActionsType =
  | UserUsernameSetType
  | UserAvatarSetType
  | UserThemeSetType
  | UserUIDSetType
  | UserVerifySetType
  | UserSetType
  | UserSocketIDSetType
  | UserListUIDSSetType
  | UserListUIDSRemoveType
  | UserMessageViewSetType;
