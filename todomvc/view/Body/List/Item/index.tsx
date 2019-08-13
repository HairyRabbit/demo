import { useCallback, memo, KeyboardEvent, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../../../component/TextField'
import { Data, ActionType as TodosActionType, UpdateTodoEditAction, EnableTodoEditAction, RemoveTodoAction, ToggleTodoCompleteAction, ConfirmTodoEditAction, CancleTodoEditAction } from '../../../../action/todos'
import cc from '../../../../util/combine-classNames'
import style from './style.scss'

interface Props {
  value: Data
}

enum ControlledKeyCode {
  Enter = 13,
  ESC = 27
}

function Item({ value: data }: Props) {
  const dispatch = useDispatch()
  const handleChange = useCallback(text => dispatch<UpdateTodoEditAction>({ type: TodosActionType.UpdateTodoEdit, payload: { id: data.todo.id, text } }), [data])
  const handleDoubleClick = useCallback(() => dispatch<EnableTodoEditAction>({ type: TodosActionType.EnableTodoEdit, payload: data }), [data])

  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    switch(evt.which) {
      case ControlledKeyCode.Enter: {
        evt.preventDefault()
        dispatch<ConfirmTodoEditAction>({ type: TodosActionType.ConfirmTodoEdit, payload: data })
        return
      }
      case ControlledKeyCode.ESC: {
        evt.preventDefault()
        dispatch<CancleTodoEditAction>({ type: TodosActionType.CancleTodoEdit, payload: data })
        return
      }
      default: return
    }
  }, [data])

  const handleDestoryClick = useCallback(() => dispatch<RemoveTodoAction>({ type: TodosActionType.RemoveTodo, payload: data.todo.id }), [data.todo.id])
  const handleToggleClick = useCallback(() => dispatch<ToggleTodoCompleteAction>({ type: TodosActionType.ToggleTodoComplete, payload: data }), [data])

  const isDone = useMemo(() => data.todo.isDone, [data])
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
  }, [data])

  return (
    <div className={style.main}>
      <div className={computeStyle.left} onClick={handleToggleClick}>{computeStyle.text}</div>
      {data.isEdit ? (
        <TextField
          autoFocus
          value={data.text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className={computeStyle.middle} onDoubleClick={handleDoubleClick}>{data.todo.text}</div>
      )}
      <div className={style.right} onClick={handleDestoryClick}>✗</div>
    </div>
  )
}

export default memo(Item)