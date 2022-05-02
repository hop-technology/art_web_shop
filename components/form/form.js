// eslint-disable-next-line react/display-name
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
          className='appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400'
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
          <label htmlFor={field} className='sr-only'>
            {label}
          </label>
        ) : null}
        <div className='relative'>
          <select
            id={field}
            name={field}
            disabled={disabled}
            defaultValue={defaultValue}
            className='appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
          <div className='pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center'></div>
        </div>
        {children}
      </fieldset>
    )
  }
)

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
          className='appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400'
          ref={ref}
        />
        {children}
      </fieldset>
    )
  }
)

const FormInput = (props) => {
  const { errors, register } = useFormContext()

  return (
    <>
      <Input ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className='mt-2 text-red-700 text-sm'>
            {errors[props.field].message}
          </p>
        ) : null}
      </Input>
    </>
  )
}

const FormSelect = (props) => {
  const { errors, register } = useFormContext()

  return (
    <Select ref={register} {...props}>
      {errors?.[props.field] ? (
        <p className='mt-2 text-red-700 text-sm'>
          {errors[props.field].message}
        </p>
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
          <p className='mt-2 text-red-700 text-sm'>
            {errors[props.field].message}
          </p>
        ) : null}
      </Textarea>
    </>
  )
}

FormInput.displayName = 'FormInput'
FormSelect.displayName = 'FormSelect'
FormTextarea.displayName = 'FormTextarea'

export default Form

export { Input, Select, Textarea }
