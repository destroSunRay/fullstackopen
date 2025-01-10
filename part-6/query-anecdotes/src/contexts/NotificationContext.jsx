import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

const notifiactionReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;

    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notifiactionReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotificationValue = () => {
  const notifcation = useContext(NotificationContext);
  return notifcation[0];
};

export const useNotificationDispatch = () => {
  const notifcation = useContext(NotificationContext);
  return notifcation[1];
};

export default NotificationContext;
