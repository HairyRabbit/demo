import { useSelector } from "react-redux"
import { Model } from "../../../store"
import style from './style.scss'
import Summary from "./Summary"
import Tabs from "./Tabs"
import Destory from "./Destory"


export default function Footer() {
  const sum = useSelector<Model, number>((model: Model) => model.todos.data.count())
  if(0 === sum) return null

  return (
    <footer className={style.main}>
      <Summary />
      <Tabs />
      <Destory />
    </footer>
  )
}