import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessage } from '../redux/reducers/message.slice'

const PopUp = () => {
  const message = useSelector((state) => state.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (message.open === true) {
      setTimeout(() => {
        dispatch(resetMessage())
      }, 1500)
    }
  }, [message])

  return message.open && message.success ?
    <div className='popup'>
      <div className='popup__success'>{message.message}</div>
    </div>
   : (
    message.open && (
      <div className='popup'>
        <div className='popup__error'>{message.message}</div>
      </div>
    )
  )
}

export default PopUp
