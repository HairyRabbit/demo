import { useCallback, KeyboardEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Model, ActionType } from './store'
import TextField from './component/TextField'
import style from './Creator.scss'

export default function Creator() {
  const dispatch = useDispatch()
  const value = useSelector((model: Model) => model.creator.value)
  const handleChange = useCallback(val => {
    dispatch({ type: ActionType.creator.UpdateValue, payload: val })
  }, [value])

  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    const val = value.trim()
    if('' === val || 13 !== evt.which) return
    evt.preventDefault()
    const data = { 
      todo: { 
        id: Date.now(), 
        text: val, 
        isDone: false 
      }, 
      text: '', 
      isEdit: false 
    }
    dispatch({ type: ActionType.todos.CreateTodo, payload: data })
    dispatch({ type: ActionType.creator.CleanValue })
  }, [value])

  const handleClick = useCallback(() => {
    dispatch({ type: ActionType.todos.ToggleTodoAllComplete })
  }, [value])
  
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