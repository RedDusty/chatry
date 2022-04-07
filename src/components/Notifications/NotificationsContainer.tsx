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
  const [startAt, setStartAt] = React.useState(0);
  const [isEnd, setIsEnd] = React.useState(false);
  const dispatch = useTypedDispatch();

  const getNotifications = React.useCallback(() => {
    console.log('notifs');
    
    axios
      .get("/api/notifications", {
        params: {
          startAt,
        },
      })
      .then((res) => {
        console.log('then');
        
        setStartAt((prev) => prev + 1);

        if (res.data[0].header) {
          for (let idx = 0; idx < res.data.length; idx++) {
            dispatch({ type: "NOTIFICATIONS_ADD", payload: res.data[idx] });
          }

          if (res.data.length < 10) {
            setIsEnd(true);
          }
        }
      })
      .catch(() => {
        console.log('catch');
        
        setIsEnd(true);
      });
  }, [dispatch, startAt]);

  React.useEffect(() => {
    if (userUID) {
      getNotifications();
      socket.on("FRIEND_REQUEST_CLIENT_NOTIF", friendRequestNotif);
    }

    return () => {
      socket.off("FRIEND_REQUEST_CLIENT_NOTIF");
    };
  }, [userUID, getNotifications]);
  return (
    <Notifications
      isNotifShow={isNotifShow}
      getNotifications={getNotifications}
      isEnd={isEnd}
    />
  );
};

export default NotificationsContainer;
