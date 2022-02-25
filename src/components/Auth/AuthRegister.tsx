import React from "react";
import { Link } from "react-router-dom";
import AuthInput from "components/Utils/AuthInput";
import axios from "axios";

const AuthRegister = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rpassword, setRPassword] = React.useState("");
  const [msg, setMsg] = React.useState(["Please fill the form", false]);
  const [canPass, setPass] = React.useState(true);

  React.useEffect(() => {
    if (email.match(/@/g) === null) {
      setMsg(["Email must contain an '@'", false]);
      return;
    }
    if (email.match(/.+@.+/g) === null) {
      setMsg(["Email must contain characters before and after '@'", false]);
      return;
    }
    if (username.length < 4) {
      setMsg(["The username must be at least 4 characters long", false]);
      return;
    }
    if (password.length < 6) {
      setMsg(["The password must be at least 6 characters long", false]);
      return;
    }
    if (password !== rpassword) {
      setMsg(["Passwords do not match", false]);
      return;
    }

    setMsg(["Waiting for the form to be sent", true]);
  }, [email, password, rpassword, username]);

  const registerHandler = () => {
    if (canPass === false) return false;
    setPass(false);

    setMsg(["Please wait...", true]);

    axios
      .post("/api/register", {
        email,
        password,
        username,
      })
      .then((v) => {
        if (v.data === "EMAIL_SEND") {
          setMsg(["A confirmation letter was sent in the mail", true]);
        } else {
          setMsg(["Unknown error", false]);
        }
      })
      .catch((e) => {
        switch (e) {
          case "USER_EXISTS":
            setMsg(["User with that already exists", false]);
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
      <form className="mt-4 w-full" onSubmit={(e) => e.preventDefault()}>
        <AuthInput
          autoComplete="email"
          inputType="text"
          placeholder="Email"
          setState={setEmail}
          state={email}
        />
        <AuthInput
          autoComplete="username"
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
        <AuthInput
          autoComplete=""
          inputType="password"
          placeholder="Repeat password"
          setState={setRPassword}
          state={rpassword}
        />
        <p
          className={`${
            msg[1]
              ? "bg-green-100 text-green-700 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:text-red-200"
          } rounded-lg p-2 mb-2 bg-opacity-75 dark:bg-opacity-25`}
        >
          {msg[0]}
        </p>
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
