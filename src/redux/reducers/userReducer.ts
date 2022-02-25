import { UserActionsType, UserReducerType } from "../../typings/UserTypes";

const themeStorage = () => {
  const theme =
    (localStorage.getItem("chatry-theme") as "white" | "dark") || "white";
  document.body.classList.add(theme);
  return theme;
};

const userReducerInitial: UserReducerType = {
  displayName: "",
  email: "",
  uid: null,
  avatar: null,
  online: 0,
  userSettings: {
    theme: themeStorage(),
  },
  tokens: {
    accessToken: "",
    refreshtoken: "",
  },
  registerDate: 0,
  friendsUID: [],
  subname: "",
  verified: false,
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
    case "USER_DISPLAYNAME_SET": {
      return { ...state, displayName: action.payload };
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
    default:
      return { ...state };
  }
};

export default userReducer;
