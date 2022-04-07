const lastOnline = (online: true | number | null | undefined) => {
  if (typeof online === typeof true) return "Online";

  if (typeof online === "number") {
    const uDate = new Date(online);
    if (new Date().getTime() > uDate.getTime() + 31536000000) {
      return (
        "Last online " +
        uDate.toLocaleString("default", { month: "2-digit" }) +
        "/" +
        uDate.toLocaleString("default", { day: "2-digit" }) +
        "/" +
        uDate.toLocaleString("default", { year: "numeric" })
      );
    }

    if (new Date().getTime() > uDate.getTime() + 86400000) {
      return (
        "Last online " +
        uDate.toLocaleString("default", { month: "2-digit" }) +
        "/" +
        uDate.toLocaleString("default", { day: "numeric" })
      );
    }

    return (
      "Last seen at " +
      uDate.getHours() +
      ":" +
      uDate.getMinutes() +
      ":" +
      uDate.getSeconds()
    );
  }

  return null;
};

export default lastOnline;
