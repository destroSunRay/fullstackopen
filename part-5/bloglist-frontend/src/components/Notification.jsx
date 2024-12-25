import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [notification, setNotification])

  return (
    <>
      {notification && (
        <div
          style={{
            // position: "absolute",
            // right: 0,
            // top: 0,
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
Notification.prototype = {
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default Notification
