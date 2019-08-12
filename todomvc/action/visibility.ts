export const enum Visibility { All = 'All', Active = 'Active', Completed = 'Completed' }
export const visibilitys = [Visibility.All, Visibility.Active, Visibility.Completed]

export interface Model {
  visibility: Visibility
}

export const init: Model = {
  visibility: Visibility.All
}

export enum ActionType {
  ToggleVisibility = '@visibility/toggle'
}

export type Action = 
  | { type: typeof ActionType.ToggleVisibility, payload: Visibility }


export function update(model: Model = init, action: Action): Model {
  switch(action.type) {
    case ActionType.ToggleVisibility: return { ...model, visibility: action.payload }
    default: return model
  }
}