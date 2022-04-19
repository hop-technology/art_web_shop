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
      }, 3000)
    }
  }, [message])

  return open && <div className='popup'>
    <div className='popup__message'>

    {message.message}
    </div>
    </div>
}

export default PopUp
