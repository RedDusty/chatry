export type NOTIFICATIONS_SET = "NOTIFICATIONS_SET";
export type NOTIFICATIONS_ADD = "NOTIFICATIONS_ADD";

type notificationType = {
  header: notificationsHeaderType;
  data: string | any;
  time: number;
  icon?: null | string;
  user?: {
    username: string;
    uid: string;
  };
};

export type NotificationsReducerType = notificationType[];

type NotificationsSetType = {
  type: NOTIFICATIONS_SET;
  payload: notificationType[] | null;
};

type NotificationsAddType = {
  type: NOTIFICATIONS_ADD;
  payload: notificationType;
};

export type NotificationsActionsType =
  | NotificationsSetType
  | NotificationsAddType;
