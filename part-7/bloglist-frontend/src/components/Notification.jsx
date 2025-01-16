import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // console.log('Notification:', notification)
  return (
    <>
      {notification && (
        <div
          style={{
            border: `5px solid ${
              notification.type === 'error' ? 'red' : 'green'
            }`,
            color: notification.type === 'error' ? 'red' : 'green',
            backgroundColor: 'rgba(100,100,100,0.2)',
            borderRadius: '5px',
            padding: '0.6rem',
            margin: '0.7rem',
          }}
        >
          {notification.message}
        </div>
      )}
    </>
  )
}

Notification.displayName = 'Notification'

export default Notification
