import { useSelector } from "react-redux"
import { Model } from "../../../store"
import Summary from "./Summary"
import Tabs from "./Tabs"
import Destory from "./Destory"
import style from './style.scss'


export default function Footer() {
  const sum = useSelector<Model, number>(model => model.todos.count())
  if(0 === sum) return null

  return (
    <footer className={style.main}>
      <Summary />
      <Tabs />
      <Destory />
    </footer>
  )
}