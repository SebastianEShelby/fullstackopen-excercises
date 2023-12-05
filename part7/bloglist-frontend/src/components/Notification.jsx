import NOTIFICATION_MESSAGE_TYPES from '../constants/notification-message-types'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const notificationSelector = (state) => state.notification

const Notification = () => {
  const notification = useSelector(notificationSelector)

  if (!notification || !notification.message || !notification.type) return null

  // const messageColor = notification.type.match(
  //   NOTIFICATION_MESSAGE_TYPES.success,
  // )
  //   ? 'green'
  //   : 'red'

  return (
    <Alert className="mt-5" variant={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
