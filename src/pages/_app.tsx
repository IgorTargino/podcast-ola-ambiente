import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Player from '../components/Player'

import styles from '../styles/app.module.scss'
import '../styles/globals.scss'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
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
