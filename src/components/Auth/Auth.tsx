import React from "react";
import AuthCircle from "components/Utils/AuthCircle";
import { Route, Routes } from "react-router-dom";
import AuthRegister from "components/Auth/AuthRegister";
import AuthLogin from "components/Auth/AuthLogin";
import AuthVerify from "components/Auth/AuthVerify";
import axios from "axios";
import { UserReducerType } from "typings/UserTypes";
import { useTypedDispatch } from "redux/useTypedRedux";

const Auth = () => {
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    axios
      .post("/api/login", "", {
        headers: {
          Authorization: localStorage.getItem("accessToken") || "",
        },
      })
      .then((v) => {
        const data = v.data as UserReducerType;

        dispatch({ type: "USER_SET", payload: data });
      });
  }, [dispatch]);

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
            <Route path="/verify" element={<AuthVerify />} />
            <Route path="/" element={<AuthLogin />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Auth;
