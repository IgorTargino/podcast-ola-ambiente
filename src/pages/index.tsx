import { GetStaticProps } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react'
import ButtonPlay from '../components/ButtonPlay'
import api from '../services/api'

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
}

interface Episode {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  url: string
}

interface Props {
  listEpisodes: Array<Episode>
}

export default function Home({ listEpisodes }: Props): ReactNode {
  return (
    <div className={styles.container}>
      {listEpisodes.map((episode) => {
        return (
          <div className={styles.containerEpisode} key={episode.id}>
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
              <span>22 jan 21| {episode.duration}</span>
            </div>
            <ButtonPlay />
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes')

  const episodes = data.map((episode: EpisodeData) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      duration: Number(episode.file.duration),
      url: episode.file.url,
    }
  })

  return {
    props: {
      listEpisodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
