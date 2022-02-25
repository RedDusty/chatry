export type USER_DISPLAYNAME_SET = "USER_DISPLAYNAME_SET";
export type USER_AVATAR_SET = "USER_AVATAR_SET";
export type USER_THEME_SET = "USER_THEME_SET";
export type USER_UID_SET = "USER_UID_SET";
export type USER_VERIFY_SET = "USER_VERIFY_SET";
export type USER_SET = "USER_SET";
export type USER_SOCKETID_SET = "USER_SOCKETID_SET";

type UserSettingsType = {
  theme: "white" | "dark";
};

type tokensType = {
  accessToken: string;
  refreshtoken: string;
};

export type UserReducerType = {
  displayName: string;
  email: string;
  uid: string | null;
  avatar: string | null;
  online: true | number;
  userSettings: UserSettingsType;
  tokens: tokensType;
  registerDate: number;
  friendsUID: string[];
  subname: string;
  verified: boolean;
  socketID?: string;
};

export type UserShortType = {
  displayName: string;
  uid: string;
  online: true | number;
  avatar: string | null;
};

type UserSetType = {
  type: USER_SET;
  payload: UserReducerType;
};

type UserDisplayNameSetType = {
  type: USER_DISPLAYNAME_SET;
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

type UserActionsType =
  | UserDisplayNameSetType
  | UserAvatarSetType
  | UserThemeSetType
  | UserUIDSetType
  | UserVerifySetType
  | UserSetType
  | UserSocketIDSetType;
