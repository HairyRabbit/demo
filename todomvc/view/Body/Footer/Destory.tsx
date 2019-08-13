import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { Model } from "../../../store"
import { ActionType as TodosActionType } from "../../../action/todos"
import style from './style.scss'


export default function Destory() {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => dispatch({ type: TodosActionType.CleanTodos }), [])

  const completedTodos = useSelector<Model, number>(model => model.todos.countBy(item => item.todo.isDone))
  if(0 === completedTodos) return null

  return (
    <div className={style.right} onClick={handleClick}>
      Clear completed
    </div>
  )
}