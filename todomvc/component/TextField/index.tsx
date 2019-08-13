import { useCallback, useMemo, ChangeEvent, InputHTMLAttributes } from 'react'
import cc from '../../util/combine-classNames'
import style from './style.scss'

type BaseAttr = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface Props extends BaseAttr {
  value: string
  onChange?(value: string): void
}

export default function TextField({ value, onChange, className, ...props }: Props) {
  const classNames = useMemo(() => cc(style.main, className), [])
  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    if(`function` === typeof onChange) onChange(evt.target.value)
  }, [])

  return (
    <input 
      className={classNames}
      type="text"
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}