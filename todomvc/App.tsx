import Header from "./view/Header"
import Body from './view/Body'
import style from './App.scss'

export default function App() {
  return (
    <main className={style.main}>
      <Header />
      <Body />
    </main>
  )
}