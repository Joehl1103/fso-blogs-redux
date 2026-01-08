import { useSelector } from 'react-redux' 

const NotificationDisplay = () => {
  const { notificationType, notificationMessage } = useSelector(state => state.notification)
  if (notificationType === "success" || notificationType === 'deleted') {
    console.log('entering blog success logic')
    return (
      <div className="notification-container">
        <div id="notification" className="notification-success">
          {notificationMessage}
        </div>
      </div>
    );
  } else if (notificationType === "error") {
    return (
      <div className="notification-container">
        <div id="notification" className="notification-failure">
          {`error: ${notificationMessage}`}
        </div>
      </div>
    );
  }
  return null
};

export default NotificationDisplay;
