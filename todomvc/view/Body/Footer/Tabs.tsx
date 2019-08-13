import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Model } from "../../../store"
import { Visibility, ActionType as VisibilityActionType, ToggleVisibilityAction } from "../../../action/visibility"
import cc from '../../../util/combine-classNames'
import style from './style.scss'

export const visibilitys = [ Visibility.All, Visibility.Active, Visibility.Completed ]

export default function Tabs() {
  const visibility = useSelector<Model, Visibility>(model => model.visibility.visibility)
  
  const dispatch = useDispatch()
  const handleClick = useCallback((target: Visibility) => () => dispatch<ToggleVisibilityAction>({ type: VisibilityActionType.ToggleVisibility, payload: target }), [visibility])
  const computeStyle = useCallback((target: Visibility) => cc(style.tab, target === visibility && style.active), [visibility])

  return (
    <ul className={style.middle}>
      {visibilitys.map(item => (
        <li key={item} className={computeStyle(item)} onClick={handleClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  )
}