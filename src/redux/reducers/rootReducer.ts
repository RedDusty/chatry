import { combineReducers } from "redux";
import userReducer from "redux/reducers/userReducer";
import notificationsReducer from "redux/reducers/notificationsReducer";
import cacheReducer from "redux/reducers/cacheReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  cache: cacheReducer,
});

export default rootReducer;
