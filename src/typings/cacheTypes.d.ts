import { UserShortType } from "typings/UserTypes";

export type CACHE_CHATS_INIT = "CACHE_CHATS_INIT";
export type CACHE_USER_ADD = "CACHE_USER_ADD";
export type CACHE_USER_SET = "CACHE_USER_SET";
export type CACHE_MESSAGES_SET = "CACHE_MESSAGES_SET";
export type CACHE_CHAT_SET = "CACHE_CHAT_SET";

type MessageType = {
  mid: string;
  time: number;
  message: string | MessageType;
  files?: MessageFileType[];
  cid: string;
  user: UserShortType | "system";
};

type MessagesType = {
  cid: string;
  messages: MessageType[];
};

export type ChatMultipleType = {
  cid: string;
  usersUID: string[];
  messagesCount: number;
  chatType: "private" | "public";
  name: string;
  ownerUID: string;
  avatar: string | null;
};

export type ChatTwoType = {
  cid: string;
  users: UserShortType[];
  messagesCount: number;
  chatType: "two-side";
};

export type ChatType = ChatMultipleType | ChatTwoType;

export type CacheReducerType = {
  users: UserShortType[];
  messages: MessagesType[];
  chats: ChatType[];
};

type CacheUserAddType = {
  type: CACHE_USER_ADD;
  payload: UserShortType;
};

type CacheUserSetType = {
  type: CACHE_USER_SET;
  payload: UserShortType;
};

type CacheMessageSetType = {
  type: CACHE_MESSAGES_SET;
  payload: MessageType;
};

type CacheChatSetType = {
  type: CACHE_CHAT_SET;
  payload: ChatType;
};

type CacheInitPayloadType = {
  chats: ChatType[];
  messages: MessagesType[];
};

type CacheChatsInitType = {
  type: CACHE_CHATS_INIT;
  payload: CacheInitPayloadType;
};

export type CacheActionsType =
  | CacheUserAddType
  | CacheUserSetType
  | CacheMessageSetType
  | CacheChatSetType
  | CacheChatsInitType;
