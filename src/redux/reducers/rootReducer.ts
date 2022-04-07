import { combineReducers } from "redux";
import userReducer from "redux/reducers/userReducer";
import notificationsReducer from "redux/reducers/notificationsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
