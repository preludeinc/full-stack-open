const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  } else {
    return <div className="notification">{notification}</div>;
  }
};

export default Notification;
