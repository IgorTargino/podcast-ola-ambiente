import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'

const Player = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <Image
          src="/perfil.jpg"
          width={60}
          height={60}
          alt="Capa do episodio"
        />
        <div>
          <h2>Title</h2>
          <span>Anna, Robson, Anderson</span>
        </div>
      </div>

      <div className={styles.progress}>
        <span>12:02</span>
        <div className={styles.slider}>
          <Slider
            trackStyle={{ backgroundColor: '#04d361' }}
            railStyle={{ backgroundColor: '#9f75ff' }}
            handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
            max={3500}
            value={0}
          />
        </div>
        <span>35:18</span>
      </div>

      <div></div>
    </div>
  )
}

export default Player
