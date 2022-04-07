import axios from "axios";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";

const AuthVerify = () => {
  const [queryParams] = useSearchParams();
  const [msg, setMsg] = React.useState("");

  const email = queryParams.get("email");

  const u = useTypedSelector((s) => s.user);

  const h2Text = () => {
    if (email) return `Email confirmation ${email}`;

    return "Empty email";
  };

  React.useEffect(() => {
    if (email === null) {
      setMsg("Nothing to check");
    }
    if (u.uid) {
      if (u.verified === false) {
        setMsg("Check your inbox for an email to verify your account");
      }
      if (u.verified === true) {
        setMsg("Email verified successfully");
      }
    } else {
      setMsg("Please wait");
      axios
        .get("api/verify", { params: { email } })
        .then((res) => {
          switch (res.data) {
            case "EMAIL_VERIFIED":
              setMsg("Email verified successfully. Return to login and auth.");
              break;
            case "EMAIL_NOT_VERIFIED":
              setMsg("Check your inbox for an email to verify your account");
              break;
            default:
              setMsg("Unknown error");
              break;
          }
        })
        .catch((error) => {
          switch (error) {
            case "USER_NOT_FOUND":
              setMsg("User not found");
              break;
            default:
              break;
          }
          setMsg("Unknown error");
        });
    }
  }, [email, u]);

  return (
    <>
      <h2 className="text-lg font-medium text-center my-2 text-lighter">
        {h2Text()}
      </h2>
      <div className="w-full sm:h-full flex flex-col justify-center items-center">
        <p className="text-center text-lighter">{msg}</p>
        {u.uid ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => {
                console.warn("LOG OUT SYSTEM");
              }}
              className="link"
            >
              Log out
            </button>
            {u.verified === false ? (
              <></>
            ) : (
              <>
                <Link to={"/messages"} className="link">
                  Messages
                </Link>
                <Link to={"/news"} className="link">
                  News
                </Link>
                <Link to={"/friends"} className="link">
                  Friends
                </Link>
              </>
            )}
          </div>
        ) : (
          <Link to={"/auth"} className="link mt-4">
            Back to auth
          </Link>
        )}
      </div>
    </>
  );
};

export default AuthVerify;
