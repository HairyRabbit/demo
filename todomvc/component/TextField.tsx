import style from './TextField.scss'
import { InputHTMLAttributes, KeyboardEvent, useCallback, ChangeEvent } from 'react'

type BaseAttr = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface Props extends BaseAttr {
  value: string
  onChange?(value: string): void
}

export default function TextField({ value, onChange, ...props }: Props) {
  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    if(`function` === typeof onChange) onChange(evt.target.value)
  }, [value])

  return (
    <input 
      className={style.main}
      type="text"
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}

function isEnterPress(code: number): boolean {
  return 13 === code
}