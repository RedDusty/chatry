import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "redux/store";

type RootStateType = ReturnType<typeof store.getState>;
type AppDispatchType = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatchType>();
