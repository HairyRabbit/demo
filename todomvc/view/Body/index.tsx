import Creator from './Creator'
import List from './List'
import Footer from './Footer'
import style from './style.scss'

export default function Body() {
  return (
    <section className={style.main}>
      <Creator />
      <List />
      <Footer />
    </section>
  )
}