const PopUp = ({ message }) => {

  const [open, setOpen] = useState(false)

  return (
    <div>
      <alert>{message.message}</alert>
    </div>
  )
}

export default PopUp
