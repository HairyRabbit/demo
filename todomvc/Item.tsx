import { useCallback, memo, KeyboardEvent, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from './store'
import TextField from './component/TextField'
import { Data } from './action/todos'
import cc from './util/combine-classNames'
import style from './Item.scss'

interface Props {
  value: Data
}

function Item({ value }: Props) {
  const dispatch = useDispatch()
  const handleChange = useCallback(val => {
    dispatch({ type: ActionType.todos.UpdateTodoEdit, payload: { data: value, text: val.trim() } })
  }, [value])

  const handleDoubleClick = useCallback(() => {
    dispatch({ type: ActionType.todos.EnableTodoEdit, payload: value })
  }, [value])

  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    switch(evt.which) {
      case 13: {
        evt.preventDefault()
        dispatch({ type: ActionType.todos.ConfirmTodoEdit, payload: value })
        return
      }
      case 27: {
        evt.preventDefault()
        dispatch({ type: ActionType.todos.CancleTodoEdit, payload: value })
        return
      }
      default: return
    }
  }, [value])

  const handleDestoryClick = useCallback(() => {
    dispatch({ type: ActionType.todos.RemoveTodo, payload: value })
  }, [value])

  const handleToggleClick = useCallback(() => {
    dispatch({ type: ActionType.todos.ToggleTodoComplete, payload: value })
  }, [value])

  const isDone = useMemo(() => value.todo.isDone, [value])
  const computeStyle = useMemo(() => {
    if(!isDone) return { 
      left: style.left, 
      middle: style.middle,
      text: `⚝`
    }

    return {
      left: cc(style.left, style.active),
      middle: cc(style.middle, style.active),
      text: `✓`
    }
  }, [value])

  return (
    <div className={style.main}>
      <div className={computeStyle.left} onClick={handleToggleClick}>{computeStyle.text}</div>
      {value.isEdit ? (
        <TextField
          autoFocus
          value={value.text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className={computeStyle.middle} onDoubleClick={handleDoubleClick}>{value.todo.text}</div>
      )}
      <div className={style.right} onClick={handleDestoryClick}>✗</div>
    </div>
  )
}

export default memo(Item)