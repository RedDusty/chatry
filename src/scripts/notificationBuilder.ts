import { notificationType } from "typings/NotificationsTypes";

export default function notificationsBuilder(notif: notificationType) {
  switch (notif.header) {
    case "ACCOUNT_REGISTER":
      return {
        header: "Account registered!",
        data: "There are now more options available to you on the website.",
        time: notif.time,
        icon: notif.icon,
      };
    default:
      return notif;
  }
}

//
