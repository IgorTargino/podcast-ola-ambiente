import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'

import api from '../../services/api'
import { usePlayer } from '../../context/PlayerContext'
import convertDurationToTimeString from '../../utils/convertDurationToTimeString'

import { BsCaretDownFill, BsFillPlayFill } from 'react-icons/bs'
import styles from './styles.module.scss'

interface Episode {
  id: string
  title: string
  thumbnail: string
  members: string
  description: string
  duration: number
  durationAsString: string
  url: string
  roteiro: string
}

interface EpisodeProps {
  episode: Episode
}

type ContextParams = {
  slug: string
}

type PageProps = {
  episode: null | Episode
}

const Episode = ({ episode }: EpisodeProps): JSX.Element => {
  const { play } = usePlayer()

  return (
    <div className={styles.container}>
      <div className={styles.episodeContainer}>
        <header>
          <div className={styles.profile}>
            <Image
              src={episode.thumbnail}
              width={60}
              height={60}
              alt={episode.title}
            />
            <div>
              <h2>{episode.title}</h2>
              <span>{episode.members}</span>
            </div>
          </div>
          <button type="button" onClick={() => play(episode)}>
            <BsFillPlayFill size={15} color="#fff" />
          </button>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        ></div>

        <button
          className={styles.buttonDownload}
          type="submit"
          onClick={() => window.open(episode.roteiro)}
        >
          <a href={episode.roteiro} download={episode.id}></a>
          Roteiro
          <div>
            <BsCaretDownFill size={15} color="#fff" />
          </div>
        </button>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes')

  const paths = data.map((episode: Episode) => {
    return {
      params: {
        slug: episode.id,
      },
    }
  })

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PageProps, ContextParams> = async (
  ctx
) => {
  const slug = ctx.params?.slug
  const { data } = await api.get(`episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
    roteiro: data.roteiro,
  }

  return {
    props: {
      episode: episode,
    },
  }
}

export default Episode
