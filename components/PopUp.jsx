import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetMessage } from '../redux/reducers/message.slice'

const PopUp = ({ message }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (message.open === true) {
      setOpen(true)
      setTimeout(() => {
        dispatch(resetMessage())
        setOpen(false)
      }, 5000)
    }
  }, [message])

  return open && <div>{message.message}</div>
}

export default PopUp
