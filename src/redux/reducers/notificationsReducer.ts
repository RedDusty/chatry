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
      const newState = state;
      newState.unshift(action.payload);
      return [...newState];
    }
    default:
      return [...state];
  }
};

export default notificationsReducer;
