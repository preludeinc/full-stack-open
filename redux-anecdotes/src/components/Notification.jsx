import { useSelector } from 'react-redux'


const Notification = () => {
  const notifications = useSelector((state) => state.notification)
  const recentNotification = notifications.length > 0 ? notifications[notifications.length - 1] : []

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  }

  return (
    <div style={style}>
      {recentNotification ? (
        <p>{recentNotification.content}</p>
      ) : (
        <div>No notifications</div>
      )}
    </div>
  )
}

export default Notification
