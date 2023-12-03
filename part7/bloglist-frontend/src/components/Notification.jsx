import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'

const Notification = ({ notification }) => {
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
