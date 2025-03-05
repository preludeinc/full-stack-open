import { useNotifications } from "../context/NotificationContext"

const Notification = () => {
  const notification = useNotifications()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification.length == 0 || notification === undefined) return null
  else {
    const content = notification[notification.length - 1].content
    return (
      <div style={style}>
        {content}
      </div>
    )
  }
}

export default Notification
