import React from "react";
import AuthCircle from "components/Utils/AuthCircle";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthRegister from "components/Auth/AuthRegister";
import AuthLogin from "components/Auth/AuthLogin";
import axios from "axios";
import { useTypedDispatch } from "redux/useTypedRedux";
import IconLoading from "icons/IconLoading";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [isLogin, setLogin] = React.useState<boolean>(false);
  const location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("uid")) {
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

            if (location.state && (location.state as any).from) {
              navigate((location.state as any).from);
            } else {
              navigate("/user/" + data.user.subname);
            }
          }
        })
        .catch(() => {
          setLogin(false);
        });
    }
  }, [dispatch, location.state, navigate]);

  if (isLogin) {
    return (
      <section className="flex flex-1 justify-center items-center">
        <div className="w-[20vw] h-[20vw]">
          <IconLoading />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 justify-center items-center">
      <div className="relative w-full h-full sm:h-auto sm:max-w-lg">
        <AuthCircle css="-top-10 -right-10 bg-sky-400 dark:bg-slate-700" />
        <AuthCircle css="-left-10 -bottom-10 bg-slate-400 dark:bg-indigo-700" />
        <div className="w-full h-full relative px-4 sm:rounded-lg bg-white bg-opacity-5 shadow-md sm:border sm:border-solid sm:border-slate-700 sm:dark:border-slate-200 sm:border-opacity-50 sm:dark:border-opacity-50 backdrop-blur-sm flex flex-col justify-center items-center sm:p-12">
          <h1 className="text-2xl text-black dark:text-white text-center font-semibold">
            Chatry
          </h1>
          <Routes>
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/" element={<AuthLogin />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Auth;
