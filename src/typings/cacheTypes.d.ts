export type CACHE_CHATS_INIT = "CACHE_CHATS_INIT";
export type CACHE_USER_SET = "CACHE_USER_SET";
export type CACHE_MESSAGES_SET = "CACHE_MESSAGES_SET";
export type CACHE_CHAT_SET = "CACHE_CHAT_SET";
export type CACHE_DIALOG_CID_SET = "CACHE_DIALOG_CID_SET";

type MessageType = {
  time: number;
  message: string | MessageType;
  images?: string[];
  cid: string;
  mid: number;
  user: string | "system";
};

type MessagesType = {
  cid: string;
  messages: MessageType[];
};

type MessageAcceptType = {
  messagesCount: number;
  message: MessageType;
  cid: number;
  error?: boolean;
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

type CacheInitPayloadType = {
  chats: ChatType[];
  messages: MessagesType[];
};

export type ChatTwoType = {
  cid: string;
  usersUID: string[];
  messagesCount: number;
  chatType: "two-side";
};

export type ChatType = ChatMultipleType | ChatTwoType;

export type CacheReducerType = {
  messages: MessagesType[];
  chats: ChatType[];
  dialogCID: string | null;
};

type CacheMessageSetType = {
  type: CACHE_MESSAGES_SET;
  payload: MessageType;
};

type CacheChatSetType = {
  type: CACHE_CHAT_SET;
  payload: ChatType;
};

type CacheChatsInitType = {
  type: CACHE_CHATS_INIT;
  payload: CacheInitPayloadType;
};

type CacheDialogCIDSetType = {
  type: CACHE_DIALOG_CID_SET;
  payload: string | null;
};

export type CacheActionsType =
  | CacheMessageSetType
  | CacheChatSetType
  | CacheChatsInitType
  | CacheDialogCIDSetType;
