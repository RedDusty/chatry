import React from "react";
import { Link } from "react-router-dom";
import AuthInput from "components/Utils/AuthInput";
import axios from "axios";
import { UserReducerType } from "typings/UserTypes";
import { useTypedDispatch } from "redux/useTypedRedux";

const AuthLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [msg, setMsg] = React.useState(["Please fill the form", false]);
  const [canPass, setPass] = React.useState(true);

  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    if (email.match(/@/g) === null) {
      setMsg(["Email must contain an '@'", false]);
      return;
    }
    if (email.match(/.+@.+/g) === null) {
      setMsg(["Email must contain characters before and after '@'", false]);
      return;
    }
    if (password.length < 6) {
      setMsg(["The password must be at least 6 characters long", false]);
      return;
    }

    setMsg(["Waiting for the form to be sent", true]);
  }, [email, password]);

  const loginHandler = () => {
    if (canPass === false) return false;
    setPass(false);

    setMsg(["Please wait...", true]);

    axios
      .post("/api/login", {
        email,
        password,
      })
      .then((v) => {
        const data = v.data as UserReducerType;
        dispatch({ type: "USER_SET", payload: data });

        axios.defaults.headers.common["Authorization"] =
          data.tokens.accessToken;
        localStorage.setItem("accessToken", data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
        localStorage.setItem("uid", data.uid!);
      })
      .catch((err) => {
        switch (err) {
          case "INVALID_EMAIL_OR_PASSWORD":
            setMsg(["Invalid login or password", false]);
            break;
          case "USER_NOT_FOUND":
            setMsg(["User not found", false]);
            break;
          default:
            setMsg(["Unknown error", false]);
            break;
        }
        setPass(true);
      });
  };

  return (
    <>
      <h2 className="text-xl font-medium text-center mb-4 text-lighter">
        Authentication
      </h2>
      <p className="text-center text-lighter">
        Need to register?{" "}
        <Link className="link" to={"/auth/register"}>
          Click here.
        </Link>
      </p>
      <form className="mt-4 w-full" onSubmit={(e) => e.preventDefault()}>
        <AuthInput
          autoComplete="email"
          inputType="text"
          placeholder="Email"
          setState={setEmail}
          state={email}
        />
        <AuthInput
          autoComplete="new-password"
          inputType="password"
          placeholder="Password"
          setState={setPassword}
          state={password}
        />
        <p
          className={`${
            msg[1] === true
              ? "bg-green-100 text-green-700 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:text-red-200"
          } rounded-lg p-2 mb-2 bg-opacity-75 dark:bg-opacity-25`}
        >
          {msg[0]}
        </p>
        <button
          className="text-black dark:text-white border border-black dark:border-white border-solid border-opacity-20 dark:border-opacity-20 bg-sky-300 dark:bg-indigo-700 hover:bg-sky-200 dark:hover:bg-indigo-600 focus:bg-sky-400 dark:focus:bg-indigo-800 w-full h-10 text-lg rounded-lg"
          onClick={loginHandler}
        >
          {msg[0] === "Please wait..." ? msg[0] : "Login"}
        </button>
      </form>
    </>
  );
};

export default AuthLogin;
