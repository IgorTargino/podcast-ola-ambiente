import type { AppProps } from 'next/app'
import '../styles/globals.scss'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>Logo aqui</header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>Footer aqui</footer>
    </>
  )
}
export default MyApp
