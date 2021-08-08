import React from 'react'
import { BsPlayFill } from 'react-icons/bs'

import styles from './styles.module.scss'

const ButtonPlay = () => {
  return (
    <button className={styles.buttonPlay}>
      <BsPlayFill size={30} color="#fff" />
    </button>
  )
}

export default ButtonPlay
