import { shallowEqual, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Model } from '../../../store'
import Item from './Item'
import style from './style.scss'
import { Data } from '../../../action/todos'
import { visibilityRouter, Visibility } from '../../../type/visibility'

export default function List() {
  return (
    <Switch>
      <Route path={visibilityRouter[Visibility.Active].path} exact component={ActiveList} />
      <Route path={visibilityRouter[Visibility.Completed].path} exact component={CompletedList} />
      <Route path={visibilityRouter[Visibility.All].path} exact component={AllList} />
    </Switch>
  )
}

function AllList() {
  const datas = useSelector<Model, Data[]>(model => model.todos.findAll(), shallowEqual)
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

function ActiveList() {
  const datas = useSelector<Model, Data[]>(model => model.todos.findAllBy(item => !item.todo.isDone), shallowEqual)
  return <DataList value={datas} />
}

function CompletedList() {
  const datas = useSelector<Model, Data[]>(model => model.todos.findAllBy(item => item.todo.isDone), shallowEqual)
  return <DataList value={datas} />
}

function DataList({ value }: { value: Data[] }) {
  if(0 === value.length) return null
  return (
    <ul className={style.list}>
      {value.map(data => (
        <li className={style.item} key={data.todo.id}>
          <Item value={data} />
        </li>
      ))}
    </ul>
  )
}