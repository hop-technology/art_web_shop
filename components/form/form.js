import { forwardRef } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

const Form = ({ children, methods, onSubmit, ...props }) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

const Input = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      type = 'text',
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <input
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className=''
          ref={ref}
        />
        {children}
      </fieldset>
    )
  }
)

const Select = forwardRef(
  (
    {
      children,
      className,
      defaultValue = '',
      disabled,
      field,
      label,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        {label ? (
          <label htmlFor={field} className=''>
            {label}
          </label>
        ) : null}
        <div className='relative'>
          <select
            id={field}
            name={field}
            disabled={disabled}
            defaultValue={defaultValue}
            className=''
            ref={ref}
            {...props}
          >
            <option disabled value=''>
              Please select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className=''></div>
        </div>
        {children}
      </fieldset>
    )
  }
)
Select.displayName = 'Select'

const Textarea = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      rows = 4,
      type = 'text',
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <textarea
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className=''
          ref={ref}
        />
        {children}
      </fieldset>
    )
  }
)

Textarea.displayName = 'Textarea'

const FormInput = (props) => {
  const { errors, register } = useFormContext()

  return (
    <>
      <Input ref={register} {...props}>
        {errors?.[props.field] ? <p>{errors[props.field].message}</p> : null}
      </Input>
    </>
  )
}

FormInput.displayName = 'FormInput'

const FormSelect = (props) => {
  const { errors, register } = useFormContext()

  return (
    <Select ref={register} {...props}>
      {errors?.[props.field] ? (
        <p className=''>{errors[props.field].message}</p>
      ) : null}
    </Select>
  )
}

const FormTextarea = (props) => {
  const { errors, register } = useFormContext()

  return (
    <>
      <Textarea ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className=''>{errors[props.field].message}</p>
        ) : null}
      </Textarea>
    </>
  )
}

Form.FormInput = FormInput
Form.FormTextarea = FormTextarea
Form.Select = FormSelect

export default Form

export { Select, Textarea, Input }
