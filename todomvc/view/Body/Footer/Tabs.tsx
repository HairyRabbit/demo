import { NavLink } from 'react-router-dom'
import { visibilityRouter } from "../../../type/visibility"
import style from './style.scss'

export default function Tabs() {
  return (
    <ul className={style.middle}>
      {Object.keys(visibilityRouter).map(visibility => (
        <NavLink
          key={visibility}
          to={visibilityRouter[visibility].path}
          exact
          className={style.tab}
          activeClassName={style.active}
        >
          {visibility.toUpperCase()}
        </NavLink>
      ))}
    </ul>
  )
}