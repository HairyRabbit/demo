export const enum Visibility { All = 'all', Active = 'active', Completed = 'completed' }

export const visibilityRouter = {
  [Visibility.All]: { path: '/' },
  [Visibility.Active]: { path: '/active' },
  [Visibility.Completed]: { path: '/completed' }
}