import MESSAGE_TYPES from "../constants/notification-message-types"

const Notification = ({ notification }) => {
  if (!notification || !notification.message) return null
  const messageColor = notification.type.match(MESSAGE_TYPES.success) ? 'green' : 'red';

  return (
    <div className='success' style={{ color: messageColor }}>
      {notification.message}
    </div>
  )
}

export default Notification