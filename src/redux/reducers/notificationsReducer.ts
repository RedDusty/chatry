import {
  NotificationsActionsType,
  NotificationsReducerType,
} from "typings/NotificationsTypes";

const notificationsReducerInitial: NotificationsReducerType = [];

const notificationsReducer = (
  state = notificationsReducerInitial,
  action: NotificationsActionsType
): NotificationsReducerType => {
  switch (action.type) {
    case "NOTIFICATIONS_SET": {
      if (action.payload === null) {
        return [];
      }
      return action.payload;
    }
    case "NOTIFICATIONS_ADD": {
      return [...state, action.payload];
    }
    default:
      return [...state];
  }
};

export default notificationsReducer;
