import { useSelector } from "react-redux"
import { Model } from "../../../store"
import style from './style.scss'

export default function Summary() {
  const processing = useSelector<Model, number>((model: Model) => model.todos.countBy(item => !item.todo.isDone))
  return <div className={style.left}>{stringifyNumeral(processing)} left</div>
}

function stringifyNumeral(value: number): string {
  const str = value.toString()
  switch(value) {
    case 1: return `${str} time`
    default: return `${str} times`
  }
}