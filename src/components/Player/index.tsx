import Image from 'next/image'

import { useEffect, useRef, useState } from 'react'

import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsShuffle,
} from 'react-icons/bs'

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
                disabled={episodeList.length === 1}
                onClick={toggleShuffle}
                className={isShuffling ? styles.isActive : ''}
              >
                <BsShuffle size={15} color="#fff" />
              </button>

              <button
                type="button"
                onClick={playPrevious}
                disabled={!hasPrevious}
              >
                <BsFillSkipStartFill size={15} color="#fff" />
              </button>

              <button
                type="button"
                className={styles.playButton}
                onClick={() => togglePlay()}
              >
                {isPlaying ? (
                  <BsFillPauseFill size={15} color="#fff" />
                ) : (
                  <BsFillPlayFill size={15} color="#fff" />
                )}
              </button>

              <button type="button" onClick={playNext} disabled={!hasNext}>
                <BsFillSkipEndFill size={15} color="#fff" />
              </button>

              <button
                type="button"
                onClick={toggleLoop}
                className={isLooping ? styles.isActive : ''}
              >
                <BsArrowRepeat size={15} color="#fff" />
              </button>
            </div>

            <div className={styles.progress}>
              <span>{convertDurationToTimeString(progress ?? 0)}</span>
              <div className={styles.slider}>
                <Slider
                  trackStyle={{ backgroundColor: '#44bd32' }}
                  railStyle={{ backgroundColor: '#fff' }}
                  handleStyle={{ borderColor: '#44bd32', borderWidth: 4 }}
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
