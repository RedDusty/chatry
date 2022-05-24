import {
  CacheReducerType,
  CacheActionsType,
  MessagesType,
  MessageType,
} from "typings/cacheTypes";

const cacheReducerInitial: CacheReducerType = {
  messages: [],
  chats: [],
  dialogCID: null,
};

const notificationsReducer = (
  state = cacheReducerInitial,
  action: CacheActionsType
): CacheReducerType => {
  switch (action.type) {
    case "CACHE_MESSAGES_SET":
      const cIndex = state.messages.findIndex(
        (c) => c.cid === action.payload.cid
      );
      if (cIndex !== -1) {
        const newState = state.messages.slice();
        const chat = newState[cIndex];

        const mIndex = chat.messages.findIndex(
          (m) => m.mid === action.payload.mid
        );

        if (mIndex !== -1) {
          chat.messages[mIndex] = action.payload;
        } else {
          chat.messages.push(action.payload);
        }

        return { ...state, messages: newState };
      }
      return { ...state };
    case "CACHE_CHAT_SET":
      let settedChatState = state.chats;
      const scIndex = settedChatState.findIndex(
        (c) => c.cid === action.payload.chat.cid
      );
      if (action.payload.isTemp) {
        state.messages.push({ cid: action.payload.chat.cid, messages: [] });
        settedChatState.push(action.payload.chat);
      } else {
        if (scIndex !== -1) {
          settedChatState[scIndex] = action.payload.chat;
        } else {
          settedChatState.push(action.payload.chat);
        }
      }
      settedChatState = settedChatState.sort((a, b) => {
        const ac: MessagesType | undefined = state.messages.find(
          (m) => m.cid === a.cid
        );
        const bc: MessagesType | undefined = state.messages.find(
          (m) => m.cid === b.cid
        );

        if (ac && bc) {
          const am: MessageType = ac.messages[ac.messages.length - 1];
          const bm: MessageType = bc.messages[bc.messages.length - 1];

          if (am && bm) {
            return am.time - bm.time;
          }
          return a.cid.localeCompare(b.cid);
        }
        return a.cid.localeCompare(b.cid);
      });
      return { ...state, chats: settedChatState };
    case "CACHE_CHATS_INIT":
      return {
        ...state,
        chats: action.payload.chats,
        messages: action.payload.messages,
      };
    case "CACHE_DIALOG_CID_SET":
      return {
        ...state,
        dialogCID: action.payload,
      };
    case "CACHE_CHAT_TWO_ACCEPT":
      const reqUID = action.payload.reqUID;
      const chat = state.chats.filter(
        (c) => c.chatType === "two-side" && c.usersUID.includes(reqUID)
      );
      const messages = state.messages.filter(
        (m) => m.cid === `TEMP__${reqUID}`
      );
      if (chat.length === 1) {
        chat[0].cid = action.payload.chat.cid;
        chat[0].messagesCount = action.payload.chat.messagesCount;
      }
      if (messages.length === 1) {
        messages[0].cid = action.payload.chat.cid;
        messages[0].messages = action.payload.messages;
      }
      return { ...state };
    case "CACHE_CHAT_CREATE":
      state.chats.push(action.payload.chat);
      state.messages.push({
        cid: action.payload.chat.cid,
        messages: action.payload.messages,
      });
      return { ...state };
    default:
      return { ...state };
  }
};

export default notificationsReducer;
