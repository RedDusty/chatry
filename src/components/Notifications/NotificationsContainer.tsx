import React from "react";
import Notifications from "components/Notifications/Notifications";
import { useTypedDispatch, useTypedSelector } from "redux/useTypedRedux";
import axios from "axios";

type NotificationsType = {
  isNotifShow: boolean;
  toggleNotifications: (v?: boolean) => void;
};

const NotificationsContainer = ({
  isNotifShow,
  toggleNotifications,
}: NotificationsType) => {
  const userUID = useTypedSelector((s) => s.user.uid);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    if (userUID) {
      axios.get("/api/notifications").then((res) => {
        if (res.data[0] && res.data[0].header) {
          dispatch({ type: "NOTIFICATIONS_SET", payload: res.data });
        }
      });
    }
  }, [dispatch, userUID]);

  if (userUID) {
    return (
      <Notifications
        isNotifShow={isNotifShow}
        toggleNotifications={toggleNotifications}
      />
    );
  }

  return <></>;
};

export default NotificationsContainer;
