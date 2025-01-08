import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(setNotification(""));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, notification]);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
