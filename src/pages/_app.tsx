import type { AppProps } from 'next/app'

import Header from '../components/Header'
import Player from '../components/Player'

import { PlayerContextProvider } from '../context/PlayerContext'

import styles from '../styles/app.module.scss'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PlayerContextProvider>
      <div className={styles.container}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}
export default MyApp
