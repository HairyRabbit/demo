import { useCallback, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Model, ActionType } from "./store"
import style from './Footer.scss'
import { Visibility, visibilitys } from "./action/visibility"
import cc from './util/combine-classNames'

export default function Footer() {
  const sum = useSelector((model: Model) => model.todos.data.count())
  if(0 === sum) return null

  return (
    <footer className={style.main}>
      <Summary />
      <Tabs />
      <Destory />
    </footer>
  )
}

function Summary() {
  const processing = useSelector((model: Model) => model.todos.data.countBy(item => !item.todo.isDone))
  return <div className={style.left}>{stringifyNumeral(processing)} left</div>
}

function stringifyNumeral(value: number): string {
  switch(value) {
    case 1: return `1 time`
    default: return `${value.toString()} times`
  }
}

function Tabs() {
  const visibility = useSelector<Model, Visibility>(model => model.visibility.visibility)
  const computeStyles = useMemo(() => {
    return visibilitys.map(item => {
      if(visibility === item) return cc(style.tab, style.active)
      return style.tab
    })
  }, [visibility])

  const dispatch = useDispatch()
  const handleClick = useCallback((target: Visibility) => {
    dispatch({ type: ActionType.visibility.ToggleVisibility, payload: target })
  }, [visibility])


  return (
    <ul className={style.middle}>
      <li className={computeStyles[0]} onClick={() => handleClick(Visibility.All)}>{Visibility.All}</li>
      <li className={computeStyles[1]} onClick={() => handleClick(Visibility.Active)}>{Visibility.Active}</li>
      <li className={computeStyles[2]} onClick={() => handleClick(Visibility.Completed)}>{Visibility.Completed}</li>
    </ul>
  )
}

function Destory() {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch({ type: ActionType.todos.CleanTodos })
  }, [])
  const completedTodos = useSelector<Model, number>(model => model.todos.data.findAllBy(item => item.todo.isDone).length)

  if(0 === completedTodos) return null

  return (
    <div className={style.right} onClick={handleClick}>
      Clear completed
    </div>
  )
}