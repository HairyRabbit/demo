import { useCallback, memo, KeyboardEvent } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../../../component/TextField'
import CheckBox from '../../../../component/CheckBox'
import { Data, ActionType as TodosActionType, UpdateTodoEditAction, EnableTodoEditAction, RemoveTodoAction, ToggleTodoCompleteAction, ConfirmTodoEditAction, CancleTodoEditAction } from '../../../../action/todos'
import cc from '../../../../util/combine-classNames'
import style from './style.scss'
import IconTrash from '../../../../asset/icon/trash.svg'

interface Props {
  value: Data
}

enum ControlledKeyCode {
  Enter = 13,
  ESC = 27
}

function Item({ value: data }: Props) {
  const dispatch = useDispatch()
  const handleTextChange = useCallback(text => dispatch<UpdateTodoEditAction>({ type: TodosActionType.UpdateTodoEdit, payload: { id: data.todo.id, text } }), [data.todo.id])
  const handleCompletedChange = useCallback(() => dispatch<ToggleTodoCompleteAction>({ type: TodosActionType.ToggleTodoComplete, payload: data.todo.id }), [data.todo.id])
  const handleDoubleClick = useCallback(() => dispatch<EnableTodoEditAction>({ type: TodosActionType.EnableTodoEdit, payload: data }), [data])
  const handleDestoryClick = useCallback(() => dispatch<RemoveTodoAction>({ type: TodosActionType.RemoveTodo, payload: data.todo.id }), [data.todo.id])
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

  const isDone = data.todo.isDone

  return (
    <div className={style.main}>
      <CheckBox
        checked={isDone}
        onChange={handleCompletedChange}
      />
      {data.isEdit ? (
        <TextField
          value={data.text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className={cc(style.middle, isDone && style.active)} onDoubleClick={handleDoubleClick}>
          {data.todo.text}
        </div>
      )}
      <div className={style.right} onClick={handleDestoryClick}>
        <IconTrash className={style.icon} />
      </div>
    </div>
  )
}

export default memo(Item)