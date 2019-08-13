export const enum Visibility { All = 'All', Active = 'Active', Completed = 'Completed' }

export interface Model {
  visibility: Visibility
}

export const init: Model = {
  visibility: Visibility.All
}

export const ActionType = {
  ToggleVisibility: '@visibility/toggle'
}

export type ToggleVisibilityAction = { type: typeof ActionType.ToggleVisibility, payload: Visibility }

export type Action = 
  | ToggleVisibilityAction


export function update(model: Model = init, action: Action): Model {
  switch(action.type) {
    case ActionType.ToggleVisibility: return { ...model, visibility: action.payload }
    default: return model
  }
}