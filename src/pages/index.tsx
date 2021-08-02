import { ReactNode } from 'react'
import styles from '../styles/home.module.scss'

export default function Home(): ReactNode {
  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
    </div>
  )
}
