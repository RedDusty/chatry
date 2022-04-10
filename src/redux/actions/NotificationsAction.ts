import { Dispatch } from "redux";
import {
  NotificationsSetType,
  NotificationsAddType,
  notificationType,
} from "typings/NotificationsTypes";

export const NotificationsSet = (notifications: notificationType[] | null) => {
  return (dispatch: Dispatch<NotificationsSetType>) => {
    dispatch({ type: "NOTIFICATIONS_SET", payload: notifications });
  };
};

export const NotificationsAdd = (notification: notificationType) => {
  return (dispatch: Dispatch<NotificationsAddType>) => {
    dispatch({ type: "NOTIFICATIONS_ADD", payload: notification });
  };
};
