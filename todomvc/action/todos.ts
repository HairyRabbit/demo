import makeData, { DataContainer } from '../util/data-container'

export interface Todo {
  id: number,
  text: string,
  isDone: boolean
}

export interface Data {
  todo: Todo
  text: string
  isEdit: boolean
}

export type Model = DataContainer<Data>

export const init: Model = makeData([])

export const enum ActionType {
  CreateTodo = '@todos/create',
  UpdateTodo = '@todos/update',
  RemoveTodo = '@todos/remove',
  EnableTodoEdit = '@todos/edit/enable',
  ConfirmTodoEdit = '@todos/edit/confirm',
  CancleTodoEdit = '@todos/edit/cancle',
  UpdateTodoEdit = '@todos/edit/update',
  ToggleTodoAllComplete = '@todos/complete/all',
  ToggleTodoComplete = '@todos/complete/one',
  CleanTodos = '@todos/complete/clean',
}

export type CreateTodoAction = { type: ActionType.CreateTodo, payload: string }
export type RemoveTodoAction = { type: ActionType.RemoveTodo, payload: number }
export type CleanTodosAction = { type: ActionType.CleanTodos }
export type EnableTodoEditAction = { type: ActionType.EnableTodoEdit, payload: Data }
export type UpdateTodoEditAction = { type: ActionType.UpdateTodoEdit, payload: { id: number, text: string } }
export type ConfirmTodoEditAction = { type: ActionType.ConfirmTodoEdit, payload: Data }
export type CancleTodoEditAction = { type: ActionType.CancleTodoEdit, payload: Data }
export type ToggleTodoAllCompleteAction = { type: ActionType.ToggleTodoAllComplete }
export type ToggleTodoCompleteAction = { type: ActionType.ToggleTodoComplete, payload: number }

type Action = 
 | CreateTodoAction
 | RemoveTodoAction
 | CleanTodosAction
 | EnableTodoEditAction
 | UpdateTodoEditAction
 | ConfirmTodoEditAction
 | CancleTodoEditAction
 | ToggleTodoAllCompleteAction
 | ToggleTodoCompleteAction

export function update(model: Model = init, action: Action): Model {
  switch(action.type) {
    case ActionType.CreateTodo: return model.create({ text: '', isEdit: false, todo: { id: Date.now(), text: action.payload, isDone: false } })
    case ActionType.RemoveTodo: return model.destroyBy(item => action.payload === item.todo.id)
    
    case ActionType.EnableTodoEdit: return model.update(action.payload, { ...action.payload, isEdit: true, text: action.payload.todo.text })
    case ActionType.ConfirmTodoEdit: return model.update(action.payload, { ...action.payload, todo: { ...action.payload.todo, text: action.payload.text }, isEdit: false, text: '' })
    case ActionType.CancleTodoEdit: return model.update(action.payload, { ...action.payload, isEdit: false, text: '' })
    case ActionType.UpdateTodoEdit: {
      const { id, text } = action.payload
      return model.updateBy(
        item => id === item.todo.id, 
        data => ({ ...data, text })
      ) 
    }
    
    case ActionType.ToggleTodoComplete: return model.updateBy(
      item => action.payload === item.todo.id, 
      data => ({ ...data, todo: { ...data.todo, isDone: !data.todo.isDone }})
    )
    
    case ActionType.ToggleTodoAllComplete: {
      const isAllDone = model.everyBy(item => true === item.todo.isDone)
      return model.updateAllBy(item => ({ ...item, todo: {...item.todo, isDone: !isAllDone } }))
    }
    case ActionType.CleanTodos: return model.destroyBy(item => item.todo.isDone)
    
    default: return model
  }
}