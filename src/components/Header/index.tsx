import Image from 'next/image'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import logo from '../../assets/logo.svg'

import styles from './header.module.scss'

const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  })

  return (
    <header className={styles.container}>
      <div></div>
      <div className={styles.logo}>
        <h1>Olá, ambiente</h1>
        <Image src={logo} alt="logo" width={65} height={65} />
        <h1>Sou eu de novo.</h1>
      </div>
      <span>{currentDate}</span>
    </header>
  )
}

export default Header
