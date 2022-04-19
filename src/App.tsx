import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "components/Header/Header";
import Auth from "components/Auth/Auth";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import axios from "axios";
import socket, { socketOFF, socketON } from "socketio";
import NotificationsContainer from "components/Notifications/NotificationsContainer";
import Profile from "components/Profile/Profile";
import PeopleContainer from "components/People/PeopleContainer";
import Settings from "components/Settings/Settings";
import NotFound from "components/Utils/NotFound";
import ProtectedRoute from "components/Utils/ProtectedRoute";
import IconLoading from "icons/IconLoading";

function App() {
  const [isNotifShow, setNotifShow] = React.useState(false);
  const notificationsRef = React.useRef<HTMLElement>(null);
  const [isLogin, setLogin] = React.useState<boolean>(true);
  const user = useTypedSelector((s) => s.user);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const toggleMenu = (e: MouseEvent) => {
    if (
      notificationsRef.current &&
      notificationsRef.current.contains(e.target as any)
    ) {
      return false;
    }

    setNotifShow(() => {
      document.removeEventListener("click", toggleMenu, false);
      return false;
    });
  };

  const toggleNotifications = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    v?: boolean
  ) => {
    if (v !== undefined) {
      setNotifShow(() => {
        document.removeEventListener("click", toggleMenu, false);
        return v;
      });
    } else {
      e.stopPropagation();
      setNotifShow(() => {
        document.addEventListener("click", toggleMenu, false);
        return true;
      });
    }
  };

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("uid") + " " + localStorage.getItem("token") || "";

  React.useEffect(() => {
    if (user.uid) {
      setLogin(false);
      dispatch({ type: "USER_SOCKETID_SET", payload: socket.id });
      socketON();
    } else if (localStorage.getItem("token") && localStorage.getItem("uid")) {
      setLogin(true);
      axios
        .post("/api/login", {
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
        })
        .then((v) => {
          if (v) {
            const data = v.data;
            setLogin(false);

            axios.defaults.headers.common["Authorization"] =
              data.user.uid + " " + data.token;

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            dispatch({ type: "USER_SET", payload: data.user });

            if (window.location.pathname === "/") {
              navigate("/user/" + data.user.subname);
            }
          }
        })
        .catch(() => {
          setLogin(false);
        });
    } else {
      setLogin(false);
    }
    return () => {
      socketOFF();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  return (
    <div
      className={`w-full h-full bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row overflow-x-hidden`}
    >
      <Header
        isNotifShow={isNotifShow}
        toggleNotifications={toggleNotifications}
      />
      {isLogin ? (
        <section className="flex flex-1 justify-center items-center">
          <div className="w-[20vw] h-[20vw]">
            <IconLoading />
          </div>
        </section>
      ) : (
        <Routes>
          <Route path="/user/:uid" element={<Profile />} />
          <Route path="/people" element={<PeopleContainer />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <NotificationsContainer
        isNotifShow={isNotifShow}
        toggleNotifications={toggleNotifications}
        notificationsRef={notificationsRef}
      />
    </div>
  );
}

export default App;
