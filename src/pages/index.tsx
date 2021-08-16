import { GetStaticProps } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react'
import { usePlayer } from '../context/PlayerContext'
import api from '../services/api'
import convertDurationToTimeString from '../utils/convertDurationToTimeString'

import styles from './home.module.scss'

interface EpisodeData {
  id: string
  title: string
  members: string
  thumbnail: string
  description: string
  file: {
    url: string
    type: string
    duration: string
  }
  roteiro: string
}

interface Episode {
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  roteiro: string
}

interface Props {
  episodeList: Array<Episode>
}

export default function Home({ episodeList }: Props): ReactNode {
  const { playList } = usePlayer()

  return (
    <div className={styles.container}>
      <div className={styles.containerEpisodes}>
        {episodeList.map((episode, index) => {
          return (
            <div className={styles.episode} key={index}>
              <Image
                src={episode.thumbnail}
                alt="logo"
                width={150}
                height={150}
                quality={100}
              />
              <div className={styles.info}>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <br></br>
                <span>{episode.durationAsString}</span>
              </div>

              <button
                type="button"
                onClick={() => playList(episodeList, index)}
              >
                <Image
                  src="/play.svg"
                  alt="Tocar episodio"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes')

  const episodes = data.map((episode: EpisodeData) => {
    return {
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
      roteiro: episode.roteiro,
    }
  })

  return {
    props: {
      episodeList: episodes,
    },
  }
}
