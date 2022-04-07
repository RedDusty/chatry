import React from "react";

const AuthCircle = ({ css }: { css: string }) => {
  return (
    <div
      className={`rounded-full absolute ${css}`}
      style={{
        width: 100,
        height: 100,
      }}
    ></div>
  );
};

export default AuthCircle;
