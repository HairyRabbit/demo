import { shallowEqual, useSelector } from 'react-redux'
import { Model } from './store'
import Item from './Item'
import style from './List.scss'
import { Data } from './action/todos'
import { Visibility } from './action/visibility'

export default function List() {
  const visibility = useSelector<Model, Visibility>(model => model.visibility.visibility)
  const datas = useSelector<Model, Data[]>(model => {
    switch(visibility) {
      case Visibility.All: return model.todos.data.findAll()
      case Visibility.Active: return model.todos.data.findAllBy(item => !item.todo.isDone)
      case Visibility.Completed: return model.todos.data.findAllBy(item => item.todo.isDone)
    }
  }, shallowEqual)
  if(0 === datas.length) return null

  return (
    <ul className={style.list}>
      {datas.map(data => (
        <li className={style.item} key={data.todo.id}>
          <Item value={data} />
        </li>
      ))}
    </ul>
  )
}