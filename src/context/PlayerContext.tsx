import { createContext, ReactNode, useContext, useState } from 'react'

interface Episode {
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  roteiro: string
}

interface PlayerContextData {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
}

interface PlayerContextProviderProps {
  children: ReactNode
}

interface PlayerContextData {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  hasNext: boolean
  hasPrevious: boolean
  play: (episode: Episode) => void
  playList: (list: Episode[], index: number) => void
  setPlayingState: (state: boolean) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  playNext: () => void
  playPrevious: () => void
  clearPlayerState: () => void
}

const PlayerContext = createContext({} as PlayerContextData)

const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState<Array<Episode>>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  const hasNext = isShuffling || currentEpisodeIndex < episodeList.length - 1
  const hasPrevious = currentEpisodeIndex > 0

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setIsPlaying(true)
    setCurrentEpisodeIndex(index)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )

      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (isShuffling) {
      const previousRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )

      setCurrentEpisodeIndex(previousRandomEpisodeIndex)
    } else if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

function usePlayer() {
  const context = useContext(PlayerContext)

  return context
}

export { PlayerContextProvider, usePlayer }
