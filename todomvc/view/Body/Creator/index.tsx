import { useCallback, KeyboardEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '../../../component/TextField'
import CheckBox from '../../../component/CheckBox'
import { Model } from '../../../store'
import { CreateTodoAction, ActionType as TodosActionType, ToggleTodoAllCompleteAction } from '../../../action/todos'
import { CleanValueAction, ActionType as CreatorActionType, UpdateValueAction } from '../../../action/creator'
import style from './style.scss'

export default function Creator() {
  const value = useSelector<Model, string>(model => model.creator)
  const isAllDone = useSelector<Model, boolean>(model => model.todos.count() && model.todos.everyBy(data => data.todo.isDone))
  const dispatch = useDispatch()
  const handleTextChange = useCallback(text => dispatch<UpdateValueAction>({ type: CreatorActionType.UpdateValue, payload: text.trim() }), [])
  const handleToggleChange = useCallback(() => dispatch<ToggleTodoAllCompleteAction>({ type: TodosActionType.ToggleTodoAllComplete }), [])
  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    if('' === value || 13 !== evt.which) return
    evt.preventDefault()
    dispatch<CreateTodoAction>({ type: TodosActionType.CreateTodo, payload: value })
    dispatch<CleanValueAction>({ type: CreatorActionType.CleanValue })
  }, [value])
  
  return (
    <div className={style.main}>
      <CheckBox
        checked={isAllDone}
        onChange={handleToggleChange}
      />
      <TextField
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        className={style.input}
        placeholder="What needs to be done?"
        autoFocus
      />
    </div>
  )
}