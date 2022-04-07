import { UserShortType } from "typings/UserTypes";
import store from "redux/store";
import { notificationType } from "typings/NotificationsTypes";

type frDataType = {
  header: "RECEIVE" | "ACCEPT" | "DECLINE" | "REMOVE" | "ADD";
  user: UserShortType;
};

export function friendRequest(data: frDataType) {
  switch (data.header) {
    case "RECEIVE":
      store.dispatch({
        type: "USER_LIST_UIDS_SET",
        payload: {
          list: "waitings",
          uids: data.user.uid,
        },
      });
      break;
    case "ADD":
      store.dispatch({
        type: "USER_LIST_UIDS_REMOVE",
        payload: {
          list: "waitings",
          uid: data.user.uid,
        },
      });
      store.dispatch({
        type: "USER_LIST_UIDS_SET",
        payload: {
          list: "friends",
          uids: data.user.uid,
        },
      });
      break;
    case "DECLINE":
      store.dispatch({
        type: "USER_LIST_UIDS_REMOVE",
        payload: {
          list: "waitings",
          uid: data.user.uid,
        },
      });
      break;
    case "REMOVE":
      store.dispatch({
        type: "USER_LIST_UIDS_REMOVE",
        payload: {
          list: "friends",
          uid: data.user.uid,
        },
      });
      break;
    default:
      break;
  }
}

export function friendRequestNotif(data: notificationType) {
  store.dispatch({ type: "NOTIFICATIONS_ADD", payload: data });
}
