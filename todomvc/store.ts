import { createStore, combineReducers } from 'redux'
import * as creator from './action/creator'
import * as todos from './action/todos'
import * as visibility from './action/visibility'

export type Model = {
  creator: creator.Model,
  todos: todos.Model,
  visibility: visibility.Model
}

export const reducer = combineReducers({
  creator: creator.update,
  todos: todos.update,
  visibility: visibility.update
})

declare namespace window {
  var __REDUX_DEVTOOLS_EXTENSION__: (() => any) | undefined
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store