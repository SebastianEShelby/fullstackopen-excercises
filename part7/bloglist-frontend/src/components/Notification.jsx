import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'
import { useSelector } from 'react-redux'

const notificationSelector = (state) => state.notification

const Notification = () => {
  const notification = useSelector(notificationSelector)

  if (!notification || !notification.message || !notification.type) return null

  const messageColor = notification.type.match(
    NOTIFICATION_MESSAGE_TYPES.success,
  )
    ? 'green'
    : 'red'

  return (
    <div className="notification" style={{ color: messageColor }}>
      {notification.message}
    </div>
  )
}

export default Notification
