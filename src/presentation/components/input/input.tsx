import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@presentation/context/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context) as any
  const error = state[`${props.name!}Error`]

  const enableInput = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.readOnly = false
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const getStatus = (): string => {
    return '😢'
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name!}-status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input