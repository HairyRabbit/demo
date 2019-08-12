import Header from "./Header"
import Body from './Body'
import style from './App.scss'

export default function App() {
  return (
    <main className={style.main}>
      <Header />
      <Body />
    </main>
  )
}