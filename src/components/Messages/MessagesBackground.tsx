import React from "react";
import { useTypedSelector } from "redux/useTypedRedux";

const MessagesBackground = ({ component }: { component: React.ReactNode }) => {
  const theme = useTypedSelector((s) => s.user.userSettings.theme);

  const bg =
    theme === "white"
      ? "rgba(241, 247, 255, 1)"
      : "rgba(10, 21, 39, 1)";

  return (
    <div
      className="w-full h-full flex-1"
      style={{
        background: bg,
      }}
    >
      {component}
    </div>
  );
};

export default MessagesBackground;
