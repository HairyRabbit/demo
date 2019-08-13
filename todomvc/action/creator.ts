export type Model = string

export const init: Model = ''

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
    case ActionType.UpdateValue: return action.payload
    case ActionType.CleanValue: return init
    default: return model
  }
}