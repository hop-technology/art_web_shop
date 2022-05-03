const Button = ({ children, ...props }) => {
  return (
    <button {...props}>
      <p>{children}</p>
    </button>
  )
}

export default Button
