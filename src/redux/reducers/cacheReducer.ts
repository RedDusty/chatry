import {
  CacheReducerType,
  CacheActionsType,
  MessagesType,
  MessageType,
} from "typings/cacheTypes";

const cacheReducerInitial: CacheReducerType = {
  messages: [],
  users: [],
  chats: [],
  dialogCID: null,
};

const notificationsReducer = (
  state = cacheReducerInitial,
  action: CacheActionsType
): CacheReducerType => {
  switch (action.type) {
    case "CACHE_USER_ADD":
      let addedUsersState = state.users;
      addedUsersState.push(action.payload);
      addedUsersState = addedUsersState.sort((a, b) =>
        String(a.username)
          .toLowerCase()
          .localeCompare(String(b.username).toLowerCase())
      );
      return { ...state, users: addedUsersState };
    case "CACHE_USER_SET":
      let settedUsersState = state.users;
      const suIndex = settedUsersState.findIndex(
        (v) => v.uid === action.payload.uid
      );
      if (suIndex !== -1) {
        settedUsersState[suIndex] = action.payload;
      } else {
        settedUsersState.push(action.payload);
      }
      settedUsersState = settedUsersState.sort((a, b) =>
        String(a.username)
          .toLowerCase()
          .localeCompare(String(b.username).toLowerCase())
      );
      return { ...state, users: settedUsersState };
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
        (c) => c.cid === action.payload.cid
      );
      if (scIndex !== -1) {
        settedChatState[scIndex] = action.payload;
      } else {
        settedChatState.push(action.payload);
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

          return am.time - bm.time;
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
    default:
      return { ...state };
  }
};

export default notificationsReducer;
