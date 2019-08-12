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

export type Action = 
 | { type: typeof ActionType.UpdateValue, payload: string }
 | { type: typeof ActionType.CleanValue }

export function update(model: Model = init, action: Action): Model {
  switch(action.type) {
    case ActionType.UpdateValue: return { ...model, value: action.payload }
    case ActionType.CleanValue: return { ...model, value: init.value }
    default: return model
  }
}