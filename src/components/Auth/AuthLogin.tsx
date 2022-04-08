import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "components/Utils/AuthInput";
import axios from "axios";
import { useTypedDispatch } from "redux/useTypedRedux";

const AuthLogin = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [msg, setMsg] = React.useState(["Please fill the form", false]);
  const [canPass, setPass] = React.useState(true);
  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  const loginHandler = () => {
    if (canPass === false) return false;
    setPass(false);

    setMsg(["Please wait...", true]);

    axios
      .post("/api/login", {
        username,
        password,
      })
      .then((v) => {
        const data = v.data;

        axios.defaults.headers.common["Authorization"] =
          data.uid + " " + data.token;

        localStorage.setItem("uid", data.uid);
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch({ type: "USER_SET", payload: data.user });

        navigate("/profile/" + data.subname);
      })
      .catch((e) => {
        switch (e.response.data) {
          case "DATA_MISSING":
            setMsg(["Fill the form", false]);
            break;
          case "USER_NOT_FOUND":
            setMsg(["Incorrect username or password.", false]);
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
          autoComplete="login"
          inputType="text"
          placeholder="Username"
          setState={setUsername}
          state={username}
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
