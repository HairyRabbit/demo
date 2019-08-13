export interface Model {
  value: string
}

export const init: Model = {
  value: ''
}

export enum ActionType {
  UpdateValue = '@creator/update',
  CleanValue = '@creator/clean'
}

export type UpdateValueAction = { type: typeof ActionType.UpdateValue, payload: string }
export type CleanValueAction = { type: typeof ActionType.CleanValue }

type Action = 
 | UpdateValueAction
 | CleanValueAction

export function update(model: Model = init, action: Action): Model {
  switch(action.type) {
    case ActionType.UpdateValue: return { ...model, value: action.payload }
    case ActionType.CleanValue: return { ...model, value: init.value }
    default: return model
  }
}