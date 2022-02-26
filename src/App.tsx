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

function App() {
  const [isLogin, setLogin] = React.useState(false);
  const user = useTypedSelector((s) => s.user);
  const dispatch = useTypedDispatch();

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;

  console.log(axios.defaults.baseURL);

  React.useEffect(() => {
    if (user.uid) {
      setLogin(false);
      socket.emit("USER_CONNECT", user.uid);
      dispatch({ type: "USER_SOCKETID_SET", payload: socket.id });
    } else {
      setLogin(true);
      axios
        .post("/api/login")
        .then((v) => {
          if (v) {
            const data = v.data as UserReducerType;
            setLogin(false);

            dispatch({ type: "USER_SET", payload: data });
          }
        })
        .catch(() => {
          setLogin(false);
        });
    }
    return () => {};
  }, [dispatch, user.uid]);

  return (
    <div
      className={`w-full h-full bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row overflow-x-hidden`}
    >
      <Header />
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
    </div>
  );
}

export default App;
