import React from "react";
import Notifications from "components/Notifications/Notifications";
import socket from "socketio";
import { friendRequestNotif } from "scripts/friendRequest";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import axios from "axios";

type NotificationsType = {
  isNotifShow: boolean;
};

const NotificationsContainer = ({ isNotifShow }: NotificationsType) => {
  const userUID = useTypedSelector((s) => s.user.uid);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    if (userUID) {
      axios.get("/api/notifications").then((res) => {
        if (res.data[0] && res.data[0].header) {
          for (let idx = 0; idx < res.data.length; idx++) {
            dispatch({ type: "NOTIFICATIONS_ADD", payload: res.data[idx] });
          }
        }
      });
      socket.on("FRIEND_REQUEST_CLIENT_NOTIF", friendRequestNotif);
    }

    return () => {
      socket.off("FRIEND_REQUEST_CLIENT_NOTIF");
    };
  }, [dispatch, userUID]);

  if (userUID) {
    return <Notifications isNotifShow={isNotifShow} />;
  }

  return <></>;
};

export default NotificationsContainer;
