import { UserActionsType, UserReducerType } from "typings/UserTypes";

const themeStorage = () => {
  const theme =
    (localStorage.getItem("chatry-theme") as "white" | "dark") || "white";
  document.body.classList.add(theme);
  return theme;
};

const userReducerInitial: UserReducerType = {
  username: "",
  email: "",
  uid: "",
  avatar: null,
  online: 0,
  userSettings: {
    theme: themeStorage(),
  },
  registerDate: 0,
  friendsUID: [],
  ignoresUID: [],
  waitingsUID: [],
  subname: "",
  verified: false,
  socketID: undefined,
  banned: false,
};

const userReducer = (
  state = userReducerInitial,
  action: UserActionsType
): UserReducerType => {
  switch (action.type) {
    case "USER_SET": {
      return { ...state, ...action.payload };
    }
    case "USER_SOCKETID_SET": {
      return { ...state, socketID: action.payload };
    }
    case "USER_USERNAME_SET": {
      return { ...state, username: action.payload };
    }
    case "USER_AVATAR_SET": {
      return { ...state, avatar: action.payload };
    }
    case "USER_THEME_SET": {
      localStorage.setItem("chatry-theme", action.payload);
      document.body.classList.remove(
        state.userSettings.theme === "white" ? "white" : "dark"
      );
      document.body.classList.add(
        state.userSettings.theme === "white" ? "dark" : "white"
      );
      return {
        ...state,
        userSettings: { ...state.userSettings, theme: action.payload },
      };
    }
    case "USER_UID_SET": {
      return { ...state, uid: action.payload };
    }
    case "USER_VERIFY_SET": {
      return { ...state, verified: action.payload };
    }
    case "USER_LIST_UIDS_SET": {
      switch (action.payload.list) {
        case "friends":
          const friendUIDS =
            typeof action.payload.uids === "string"
              ? [...state.friendsUID, action.payload.uids]
              : action.payload.uids;
          return { ...state, friendsUID: friendUIDS };
        case "ignores":
          const ignoresUID =
            typeof action.payload.uids === "string"
              ? [...state.ignoresUID, action.payload.uids]
              : action.payload.uids;
          return { ...state, ignoresUID: ignoresUID };
        case "waitings":
          const waitingsUID =
            typeof action.payload.uids === "string"
              ? [...state.waitingsUID, action.payload.uids]
              : action.payload.uids;
          return { ...state, waitingsUID: waitingsUID };
        default:
          return { ...state };
      }
    }
    case "USER_LIST_UIDS_REMOVE": {
      switch (action.payload.list) {
        case "friends":
          const newFriendsUID = state.friendsUID.filter(
            (v) => v !== action.payload.uid
          );
          return { ...state, friendsUID: newFriendsUID };
        case "ignores":
          const newIgnoresUID = state.ignoresUID.filter(
            (v) => v !== action.payload.uid
          );
          return { ...state, ignoresUID: newIgnoresUID };
        case "waitings":
          const newWaitingsUID = state.waitingsUID.filter(
            (v) => v !== action.payload.uid
          );
          return { ...state, waitingsUID: newWaitingsUID };
        default:
          return { ...state };
      }
    }
    default:
      return { ...state };
  }
};

export default userReducer;
