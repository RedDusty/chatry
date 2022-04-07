import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "components/Header/Header";
import Auth from "components/Auth/Auth";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import axios from "axios";
import Main from "components/Main";
import socket from "socketio";
import IconLoading from "icons/IconLoading";
import { UserReducerType } from "typings/UserTypes";
import NotificationsContainer from "components/Notifications/NotificationsContainer";
import { friendRequest } from "scripts/friendRequest";

function App() {
  const [isLogin, setLogin] = React.useState(false);
  const [isNotifShow, setNotifShow] = React.useState(false);
  const user = useTypedSelector((s) => s.user);
  const dispatch = useTypedDispatch();

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("accessToken") || "";

  React.useEffect(() => {
    if (user.uid) {
      setLogin(false);
      socket.emit("USER_CONNECT", user.uid);
      dispatch({ type: "USER_SOCKETID_SET", payload: socket.id });
      socket.on("FRIEND_REQUEST_CLIENT", friendRequest);
    } else {
      setLogin(true);
      axios
        .post("/api/login")
        .then((v) => {
          if (v) {
            const data = v.data as UserReducerType;
            setLogin(false);

            dispatch({ type: "USER_SET", payload: data });

            axios.defaults.headers.common["Authorization"] =
              data.tokens.accessToken;
            localStorage.setItem("accessToken", data.tokens.accessToken);
            localStorage.setItem("refreshToken", data.tokens.refreshToken);
            localStorage.setItem("uid", data.uid!);
          }
        })
        .catch(() => {
          setLogin(false);
        });
    }
    return () => {
      socket.off("FRIEND_REQUEST_CLIENT");
    };
  }, [dispatch, user.uid]);

  return (
    <div
      className={`w-full h-full bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row overflow-x-hidden`}
    >
      <Header isNotifShow={isNotifShow} setNotifShow={setNotifShow} />
      {isLogin && user.uid === null ? (
        <section className="flex flex-1 justify-center items-center">
          <div className="w-[20vw] h-[20vw]">
            <IconLoading />
          </div>
        </section>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={user.uid ? <Main /> : <Navigate to={"/auth"} />}
          ></Route>
          <Route
            path="/auth/*"
            element={user.uid ? <Navigate to={"/"} /> : <Auth />}
          />
        </Routes>
      )}
      <NotificationsContainer isNotifShow={isNotifShow} />
    </div>
  );
}

export default App;
