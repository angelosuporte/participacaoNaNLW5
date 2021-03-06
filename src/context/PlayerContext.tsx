import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: string;
    url: string
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void; 
    playList: (list: Episode[], index: number) => void;
    setIsPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean
    
};

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProps = {
    children: ReactNode;
}
export function PlayerContextProvider({children} : PlayerContextProps){
  const [episodeList, setEpisodeList]= useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffing] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);

  }

  function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffing(!isShuffling);
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }
  

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;



  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeindex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);

    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);

    }
  }

  function playPrevious() {
    if (hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
    
  }

  return (
    <PlayerContext.Provider 
        value = {{ 
            episodeList,
            currentEpisodeIndex,
            play, 
            playList,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious,
            isPlaying, 
            togglePlay, 
            isLooping,
            toggleLoop,
            isShuffling,
            toggleShuffle,
            clearPlayerState,
            setIsPlayingState 
          }}
        >
        {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}