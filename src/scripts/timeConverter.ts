import store from 'redux/store';

const timeConverter = (
  online: boolean | number | null | undefined,
  type?: "short" | "long"
) => {
  const hourCycle = store.getState().user.userSettings.hourCycle;
  if (online === true) return "Online";
  if (online === false) return "Offline";

  if (typeof online === "number") {
    const uDate = new Date(online);
    if (new Date().getTime() > uDate.getTime() + 31536000000) {
      switch (type) {
        case "long":
          return uDate.toLocaleString("default", {
            hourCycle: hourCycle,
            year: "numeric",
            month: "long",
            weekday: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        case "short":
          return uDate.toLocaleString("default", {
            hourCycle: hourCycle,
            year: "2-digit",
            month: "short",
            weekday: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        default:
          return uDate.toLocaleString("default", {
            hourCycle: hourCycle,
            year: "2-digit",
            month: "long",
            weekday: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
      }
    }

    if (new Date().getTime() > uDate.getTime() + 86400000) {
      switch (type) {
        case "long":
          return uDate.toLocaleString("default", {
            hourCycle: hourCycle,
            month: "long",
            weekday: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        case "short":
          return uDate.toLocaleString("default", {
            hourCycle: hourCycle,
            month: "short",
            weekday: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        default:
          return uDate.toLocaleString("default", {
            hourCycle: hourCycle,
            month: "long",
            weekday: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
      }
    }

    return uDate.toLocaleString([], {
      hourCycle: hourCycle,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return null;
};

export default timeConverter;
