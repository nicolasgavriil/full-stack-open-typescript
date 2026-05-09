interface NotificationProps {
  notification: string;
}

const Notification = ({ notification }: NotificationProps) => {
  if (!notification) {
    return null;
  }
  return <div style={{ color: "red" }}>{notification}</div>;
};

export default Notification;
