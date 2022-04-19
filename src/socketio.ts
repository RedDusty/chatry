import store from "redux/store";
import io, { ManagerOptions, SocketOptions } from "socket.io-client";
import { notificationType } from "typings/NotificationsTypes";

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
  socket.on("CLIENT_FRIENDS", friendActions);
  socket.on("CLIENT_NOTIF", notificationActions);
}

export function socketOFF() {
  socket.off("CLIENT_FRIENDS");
  socket.off("CLIENT_NOTIF");
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
