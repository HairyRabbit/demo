import { useCallback, KeyboardEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Model } from '../../../store'
import TextField from '../../../component/TextField'
import { CreateTodoAction, ActionType as TodosActionType } from '../../../action/todos'
import { CleanValueAction, ActionType as CreatorActionType, UpdateValueAction } from '../../../action/creator'
import style from './style.scss'

export default function Creator() {
  const dispatch = useDispatch()
  const value = useSelector((model: Model) => model.creator.value)

  const handleChange = useCallback(val => dispatch<UpdateValueAction>({ type: CreatorActionType.UpdateValue, payload: val.trim() }), [])
  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    if('' === value) return
    else if(13 !== evt.which) return
    evt.preventDefault()
    dispatch<CreateTodoAction>({ type: TodosActionType.CreateTodo, payload: value })
    dispatch<CleanValueAction>({ type: CreatorActionType.CleanValue })
  }, [value])

  const handleClick = useCallback(() => {
    dispatch({ type: TodosActionType.ToggleTodoAllComplete })
  }, [])
  
  return (
    <div className={style.main}>
      <div className={style.left} onClick={handleClick}>✓</div>
      <TextField 
        autoFocus
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}