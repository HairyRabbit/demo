import { useCallback, ChangeEvent, HTMLAttributes } from "react"
import cc from '../../util/combine-classNames'
import style from './style.scss'

type BaseAttr = Omit<HTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
interface Props extends BaseAttr { 
  checked: boolean
  onChange?(checked: boolean): void
}

export default function CheckBox({ checked, onChange }: Props) {
  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    if(`function` === typeof onChange) onChange(evt.target.checked)
  }, [])

  return (
    <label>
      <div className={cc(style.main, checked && style.active)}>{checked ? '✓' : '⚝'}</div>
      <input type="checkbox" hidden checked onChange={handleChange} />
    </label>
  )
}