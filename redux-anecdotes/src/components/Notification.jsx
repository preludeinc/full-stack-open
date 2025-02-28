import { useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const displayNotification = (event) => {
    const content = event.target.notification.value
    dispatch(createNotification(content))
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification