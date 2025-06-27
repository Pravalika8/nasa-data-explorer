import React, { useEffect, useState } from 'react'
import Alert from '../components/common/Alerts';
import { AlertContext } from './context';

const AlertProvider = ({ children }) => {
  const [type, setType] = useState(false);
  const [message, setMessage] = useState();
  const [alertTimeout, setAlertTimeout] = useState(3000);

  useEffect(() => {
    let timeout;
    if (message && '' !== message) {
      timeout = setTimeout(() => {
        setMessage(undefined);
        console.warn(`Alert auto-dismissed after ${alertTimeout}`);
      }, alertTimeout);
    }
    return () => clearTimeout(timeout);
  }, [message]);
  return (
    <AlertContext.Provider value={{ message, setMessage, alertTimeout, setAlertTimeout, type, setType }}>
      {message && '' !== message && <Alert type={type} message={message} />}
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider