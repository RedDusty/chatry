import { notificationType } from "typings/NotificationsTypes";

export default function notificationsBuilder(notif: notificationType) {
  const notification = {
    ...notif,
  };

  switch (notif.header) {
    case "ACCOUNT_REGISTER":
      notification.header = "Account registered!";
      notification.data =
        "There are now more options available to you on the website.";
      notification.user = notif.user ? notif.user : undefined;
      break;
    case "FRIEND_REQUEST_ADD":
      notification.header = "Friend request.";
      notification.data = {
        text: "%username% sent you a friend request.",
        link: "/people?waitings=true",
      };
      notification.user = notif.user ? notif.user : undefined;
      break;
    case "FRIEND_REQUEST_ACCEPT":
      notification.header = "Friend accepted.";
      notification.data = {
        text: "%username% accepted your friend request.",
      };
      notification.user = notif.user ? notif.user : undefined;
      break;
    case "FRIEND_REMOVE":
      notification.header = "Friend removed.";
      notification.data = {
        text: "%username% removed you from his friends.",
      };
      notification.user = notif.user ? notif.user : undefined;
      break;
  }

  return notification;
}
