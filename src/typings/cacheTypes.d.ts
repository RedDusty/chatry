export type CACHE_CHATS_INIT = "CACHE_CHATS_INIT";
export type CACHE_CHAT_CREATE = "CACHE_CHAT_CREATE";
export type CACHE_MESSAGES_SET = "CACHE_MESSAGES_SET";
export type CACHE_CHAT_SET = "CACHE_CHAT_SET";
export type CACHE_DIALOG_CID_SET = "CACHE_DIALOG_CID_SET";
export type CACHE_CHAT_TWO_ACCEPT = "CACHE_CHAT_TWO_ACCEPT";

type MessageType = {
  time: number;
  message: string | MessageType;
  images?: string[];
  cid: string;
  mid: number;
  user: string | "system";
  error?: boolean;
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
  payload: {
    chat: ChatType;
    isTemp: boolean;
  };
};

type CacheChatsInitType = {
  type: CACHE_CHATS_INIT;
  payload: CacheInitPayloadType;
};

type CacheDialogCIDSetType = {
  type: CACHE_DIALOG_CID_SET;
  payload: string | null;
};

type CacheChatTwoAcceptType = {
  type: CACHE_CHAT_TWO_ACCEPT;
  payload: {
    chat: ChatTwoType;
    reqUID: string;
    messages: MessageType[];
  };
};

type CacheChatCreateType = {
  type: CACHE_CHAT_CREATE;
  payload: {
    chat: ChatTwoType;
    messages: MessageType[];
  };
};

export type CacheActionsType =
  | CacheMessageSetType
  | CacheChatSetType
  | CacheChatsInitType
  | CacheDialogCIDSetType
  | CacheChatTwoAcceptType
  | CacheChatCreateType;
