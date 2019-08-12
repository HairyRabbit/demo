import Todo from '../model/Todo'
import makeData, { DataContainer } from '../util/data-container'

export interface Data {
  todo: Todo
  text: string
  isEdit: boolean
}

export interface Model {
  data: DataContainer<Data>
}

export const init: Model = {
  data: makeData([])
}

export enum ActionType {
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

export type Action = 
 | { type: typeof ActionType.CreateTodo, payload: Data }
 | { type: typeof ActionType.UpdateTodo, payload: { current: Data, update: Data } }
 | { type: typeof ActionType.RemoveTodo, payload: Data }
 | { type: typeof ActionType.CleanTodos }
 | { type: typeof ActionType.EnableTodoEdit, payload: Data }
 | { type: typeof ActionType.UpdateTodoEdit, payload: { data: Data, text: string } }
 | { type: typeof ActionType.ConfirmTodoEdit, payload: Data }
 | { type: typeof ActionType.CancleTodoEdit, payload: Data }
 | { type: typeof ActionType.ToggleTodoAllComplete }
 | { type: typeof ActionType.ToggleTodoComplete, payload: Data }

export function update(model: Model = init, action: Action): Model {
  switch(action.type) {
    case ActionType.CreateTodo: return { ...model, data: model.data.create(action.payload) }
    case ActionType.UpdateTodo: return { ...model, data: model.data.update(action.payload.current, action.payload.update)}
    case ActionType.RemoveTodo: return { ...model, data: model.data.destroy(action.payload)}
    
    case ActionType.EnableTodoEdit: return { ...model, data: model.data.update(action.payload, { ...action.payload, isEdit: true, text: action.payload.todo.text }) }
    case ActionType.UpdateTodoEdit: return { ...model, data: model.data.update(action.payload.data, { ...action.payload.data, text: action.payload.text }) }
    case ActionType.ConfirmTodoEdit: return { ...model, data: model.data.update(action.payload, { ...action.payload, todo: { ...action.payload.todo, text: action.payload.text }, isEdit: false, text: '' }) }
    case ActionType.CancleTodoEdit: return { ...model, data: model.data.update(action.payload, { ...action.payload, isEdit: false, text: '' }) }
    
    case ActionType.ToggleTodoComplete: return { ...model, data: model.data.update(action.payload, { ...action.payload, todo: { ...action.payload.todo, isDone: !action.payload.todo.isDone }}) }
    case ActionType.ToggleTodoAllComplete: {
      const isAllDone = model.data.everyBy(item => true === item.todo.isDone)
      return { ...model, data: model.data.updateAllBy(item => ({ ...item, todo: {...item.todo, isDone: !isAllDone } })) }
    }
    case ActionType.CleanTodos: return { ...model, data: model.data.destroyBy(item => item.todo.isDone)}
    
    default: return model
  }
}