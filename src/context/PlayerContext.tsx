import { createContext, useState, ReactNode } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: string;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void; 
    playList: (list: Episode[], index: number) => void;
    setIsPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    
};

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProps = {
    children: ReactNode;
}
export function PlayerContextProvider({children} : PlayerContextProps){
  const [episodeList, setEpisodeList]= useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider 
        value = {{ 
            episodeList,
            currentEpisodeIndex,
            play, 
            playList,
            isPlaying, 
            togglePlay, 
            setIsPlayingState 
          }}
        >
        {children}
    </PlayerContext.Provider>
  )
}