const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  } else if (type === "success") {
    return <div className="success-notification">{message}</div>;
  } else if (type === "error") {
    return <div className="error-notification">{message}</div>;
  } else {
    return <div className="notification">{message}</div>;
  }
};

export default Notification;
