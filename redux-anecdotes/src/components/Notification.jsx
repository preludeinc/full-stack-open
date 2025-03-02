import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const notifications = useSelector((state) => state.notification)
  const recentNotification = notifications.length > 0 ? notifications[notifications.length - 1] : []
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    if (recentNotification) {
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }, [recentNotification])

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
