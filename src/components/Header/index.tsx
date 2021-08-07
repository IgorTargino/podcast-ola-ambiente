import Image from 'next/image'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './header.module.scss'

const Header = (): JSX.Element => {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  })

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/logo-65x65.svg"
          alt="logo"
          width={65}
          height={65}
          quality={100}
        />
        <h1>
          Olá, ambiente <br></br> Sou eu de novo.
        </h1>
      </div>
      <span>{currentDate}</span>
    </header>
  )
}

export default Header
