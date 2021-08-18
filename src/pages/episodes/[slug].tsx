import { GetStaticPaths, GetStaticProps } from 'next'

import api from '../../services/api'
import convertDurationToTimeString from '../../utils/convertDurationToTimeString'

import { usePlayer } from '../../context/PlayerContext'

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
      <h1>{episode.title}</h1>
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
