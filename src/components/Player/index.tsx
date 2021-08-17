import Image from 'next/image'

import { useEffect, useRef, useState } from 'react'

import { usePlayer } from '../../context/PlayerContext'
import convertDurationToTimeString from '../../utils/convertDurationToTimeString'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'

const Player = (): JSX.Element => {
  const {
    currentEpisodeIndex,
    episodeList,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = usePlayer()

  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const episode = episodeList[currentEpisodeIndex]

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) audioRef.current.play()
    else audioRef.current.pause()
  }, [isPlaying])

  const setupProgressListener = () => {
    if (!audioRef.current) return

    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(
        Math.floor(audioRef.current !== null ? audioRef.current.currentTime : 0)
      )
    })
  }

  const handleSeek = (amount: number) => {
    if (!audioRef.current) return

    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  const handleEpisodeEnded = () => {
    hasNext ? playNext() : clearPlayerState()
  }

  return (
    <div className={episode ? styles.container : styles.none}>
      {episode && (
        <>
          <div className={styles.profile}>
            <Image
              src={episode.thumbnail}
              width={60}
              height={60}
              alt="Capa do episodio"
            />
            <div>
              <h2>{episode.title}</h2>
              <span>{episode.members}</span>
            </div>
          </div>

          <div className={styles.playTools}>
            <div className={styles.buttons}>
              <button
                type="button"
                disabled={!episode || episodeList.length === 1}
                onClick={toggleShuffle}
                className={isShuffling ? styles.isActive : ''}
              >
                <Image
                  src="/shuffle.svg"
                  alt="Embaralhar"
                  width={15}
                  height={15}
                />
              </button>

              <button
                type="button"
                onClick={playPrevious}
                disabled={!episode || !hasPrevious}
              >
                <Image
                  src="/play-previous.svg"
                  alt="Tocar anteriorr"
                  width={15}
                  height={15}
                />
              </button>

              <button
                type="button"
                className={styles.playButton}
                disabled={!episode}
                onClick={() => togglePlay()}
              >
                {isPlaying ? (
                  <Image src="/pause.svg" alt="Pausar" width={15} height={15} />
                ) : (
                  <Image src="/play.svg" alt="Tocar" width={15} height={15} />
                )}
              </button>

              <button
                type="button"
                onClick={playNext}
                disabled={!episode || !hasNext}
              >
                <Image
                  src="/play-next.svg"
                  alt="Tocar próxima"
                  width={15}
                  height={15}
                />
              </button>

              <button
                type="button"
                disabled={!episode}
                onClick={toggleLoop}
                className={isLooping ? styles.isActive : ''}
              >
                <Image src="/repeat.svg" alt="Repetir" width={15} height={15} />
              </button>
            </div>

            <div className={styles.progress}>
              <span>{convertDurationToTimeString(progress ?? 0)}</span>
              <div className={styles.slider}>
                <Slider
                  trackStyle={{ backgroundColor: '#04d361' }}
                  railStyle={{ backgroundColor: '#9f75ff' }}
                  handleStyle={{ borderColor: '04d361', borderWidth: 4 }}
                  max={episode.duration}
                  value={progress}
                  onChange={handleSeek}
                />
              </div>
              <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>
          </div>

          <div></div>

          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={handleEpisodeEnded}
            loop={isLooping}
            onLoadedMetadata={setupProgressListener}
          />
        </>
      )}
    </div>
  )
}

export default Player
