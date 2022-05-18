import axios from "axios";
import store from "redux/store";
import io, { ManagerOptions, SocketOptions } from "socket.io-client";
import {
  CacheInitPayloadType,
  MessageAcceptType,
  MessageType,
} from "typings/cacheTypes";
import { notificationType } from "typings/NotificationsTypes";
import { UserPrivacyType } from "typings/UserTypes";

export const serverURL: string =
  process.env.REACT_APP_SERVER_URL || "localhost:8000";

const socketConfig = {
  reconnection: true,
  reconnectionDelay: 250,
  reconnectionAttempts: 50,
} as Partial<ManagerOptions & SocketOptions>;

const socket = io(serverURL, socketConfig);

export default socket;

export function socketON() {
  socket.emit("USER_CONNECT", store.getState().user.uid);
  socket.emit("MESSAGES_GET", store.getState().user.uid);
  socket.on("CLIENT_FRIENDS", friendActions);
  socket.on("CLIENT_NOTIF", notificationActions);
  socket.on("CHATS_INITIAL", (initData: CacheInitPayloadType) => {
    store.dispatch({ type: "CACHE_CHATS_INIT", payload: initData });
  });
  socket.on("MESSAGE_ACCEPT", (data: MessageAcceptType) => {
    if (data.error) {
      Object.assign(data.message, { error: true });
      store.dispatch({ type: "CACHE_MESSAGES_SET", payload: data.message });
    } else {
      store.dispatch({ type: "CACHE_MESSAGES_SET", payload: data.message });
    }
  });
  socket.on("USERNAME_CHANGE", (data) => {
    if (data.error === false) {
      store.dispatch({ type: "USER_SET", payload: data.user });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      axios.defaults.headers.common["Authorization"] =
        data.user.uid + " " + data.token;
    }
  });
}

export function socketOFF() {
  socket.off("CLIENT_FRIENDS");
  socket.off("CLIENT_NOTIF");
  socket.off("CHATS_INITIAL");
  socket.off("MESSAGE_ACCEPT");
  socket.off("USERNAME_CHANGE");
}

function notificationActions(data: notificationType) {
  store.dispatch({ type: "NOTIFICATIONS_ADD", payload: data });
}

function friendActions(data: { header: string; user: string }) {
  switch (data.header) {
    case "FRIEND_ADD":
      store.dispatch({
        type: "USER_LIST_UIDS_REMOVE",
        payload: {
          list: "waitings",
          uid: data.user,
        },
      });
      store.dispatch({
        type: "USER_LIST_UIDS_SET",
        payload: { list: "friends", uids: data.user },
      });
      break;
    case "FRIEND_REMOVE":
      store.dispatch({
        type: "USER_LIST_UIDS_REMOVE",
        payload: { list: "friends", uid: data.user },
      });
      break;
    case "FRIEND_REQUEST":
      store.dispatch({
        type: "USER_LIST_UIDS_SET",
        payload: { list: "waitings", uids: data.user },
      });
      break;
    case "FRIEND_DECLINE":
      store.dispatch({
        type: "USER_LIST_UIDS_REMOVE",
        payload: {
          list: "waitings",
          uid: data.user,
        },
      });
      break;
    default:
      break;
  }
}

export const socketFriendRequest = (
  senderUID: string,
  userUID: string,
  type: "add" | "remove"
) => {
  socket.emit("FRIEND_REQUEST", {
    type: type,
    senderUID: senderUID,
    receiverUID: userUID,
  });
};

export const socketMessageSend = (text: string, cid: string) => {
  const user = store.getState().user;

  socket.emit("MESSAGE_SEND", {
    message: {
      cid,
      message: text,
      mid: 0,
      time: new Date().getTime(),
      user: user.uid,
      files: undefined,
    } as MessageType,
    cid,
    uid: user.uid,
  });
};

export const socketUsernameChange = (username: string) => {
  const uid = store.getState().user.uid;

  socket.emit("USER_CHANGE_USERNAME", {
    username: username,
    uid: uid,
  });
};

export const socketPrivacy = (privacy: UserPrivacyType) => {
  const uid = store.getState().user.uid;

  socket.emit("USER_PRIVACY", {
    privacy,
    uid,
  });
};
