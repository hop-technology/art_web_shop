import { useState, useEffect } from 'react'

const PopUp = ({ message }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (message.open === true) {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 5000)
    } else {
      setOpen(false)
    }
  }, [message])

  return open && <div>{message.message}</div>
}

export default PopUp
