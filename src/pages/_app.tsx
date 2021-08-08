import type { AppProps } from 'next/app'

import Header from '../components/Header'
import Player from '../components/Player'

import styles from '../styles/app.module.scss'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}
export default MyApp
