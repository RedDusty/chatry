export type NOTIFICATIONS_SET = "NOTIFICATIONS_SET";
export type NOTIFICATIONS_ADD = "NOTIFICATIONS_ADD";

type notificationType = {
  header: string;
  data: string | UserShortType | any;
  time: number;
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
