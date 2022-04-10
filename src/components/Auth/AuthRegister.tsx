import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "components/Utils/AuthInput";
import axios from "axios";
import { useTypedDispatch } from "redux/useTypedRedux";

const AuthRegister = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rpassword, setRPassword] = React.useState("");
  const [msg, setMsg] = React.useState(["", false]);
  const [canPass, setPass] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const registerHandler = () => {
    if (canPass === false) return false;
    setPass(false);

    setMsg(["Please wait...", true]);

    axios
      .post("/api/register", {
        password,
        username,
      })
      .then((v) => {
        const data = v.data;

        if (data.status === "ok") {
          localStorage.setItem("uid", data.uid);
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch({ type: "USER_SET", payload: data.user });

          navigate("/user/" + data.user.subname);
        } else {
          setMsg(["Unknown error", false]);
        }
      })
      .catch((e) => {
        switch (e.response.data) {
          case "USER_EXISTS":
            setMsg(["User with that username already exists", false]);
            break;
          case "USERNAME_LENGTH":
            setMsg([
              "The username must be in the range of 4-16 characters.",
              false,
            ]);
            break;
          case "PASSWORD_LENGTH":
            setMsg([
              "The password must be in the range of 6-24 characters.",
              false,
            ]);
            break;
          default:
            setMsg(["Unknown error", false]);
            break;
        }
      });
    setPass(true);
  };

  return (
    <>
      <h2 className="text-xl font-medium text-center mb-4 text-lighter">
        Registration
      </h2>
      <p className="text-center text-lighter">
        Need to login?{" "}
        <Link className="link" to={"/auth"}>
          Click here.
        </Link>
      </p>
      <form
        className="mt-4 w-full flex flex-col gap-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <AuthInput
          autoComplete="username"
          inputType="text"
          placeholder="Username"
          setState={setUsername}
          state={username}
          subtext={"Must be 4-16 characters"}
        />
        <AuthInput
          autoComplete="new-password"
          inputType="password"
          placeholder="Password"
          setState={setPassword}
          state={password}
          subtext={"Must be 6-24 characters"}
        />
        <AuthInput
          autoComplete=""
          inputType="password"
          placeholder="Repeat password"
          setState={setRPassword}
          state={rpassword}
        />
        {(msg[0] as string).length > 0 ? (
          <p
            className={`${
              msg[1]
                ? "bg-green-100 text-green-700 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:text-red-200"
            } rounded-lg p-2 mb-2 bg-opacity-75 dark:bg-opacity-25`}
          >
            {msg[0]}
          </p>
        ) : (
          <></>
        )}
        <button
          className="text-black dark:text-white border border-black dark:border-white border-solid border-opacity-20 dark:border-opacity-20 bg-sky-300 dark:bg-indigo-700 hover:bg-sky-200 dark:hover:bg-indigo-600 focus:bg-sky-400 dark:focus:bg-indigo-800 w-full h-10 text-lg rounded-lg"
          onClick={registerHandler}
        >
          {msg[0] === "Please wait..." ? msg[0] : "Register"}
        </button>
      </form>
    </>
  );
};

export default AuthRegister;
