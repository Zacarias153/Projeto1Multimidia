import { createContext, ReactNode, useEffect, useState } from 'react';
import {musicas} from '../dados/musicas';

type Music = {
    nome: string,
    audio: string,
    capa: string
}

type HomeContextData = {
    audio: HTMLAudioElement;
    isPlaying: boolean;
    musicas: Music[];
    musicIndex: number;
    playPause: ()=> void;
    configMusic: (index: number) => void;
    duration: number;
    currentTime: number;
    configTime: (time: number) => void;
    volume: number;
    configVolume: (volume: number) => void;
    
}

type HomeContextProps = {
    children: ReactNode;
}
export const HomeContext = createContext({} as HomeContextData);

const HomeContextProvider = ({children}: HomeContextProps) =>{
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setPlaying] = useState(false);
    const [musicIndex, setMusicIndex] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    
        useEffect(()=>{
            const initialAudio = new Audio (`/audios/${musicas[musicIndex].audio}`);   
            setAudio(initialAudio);
           // initialAudio.play();
        }, []);

        useEffect(() =>{
            if(audio){
                if(isPlaying){
                    audio.play();
                }
                audio.onloadeddata = () =>{
                    setDuration(audio.duration);
                }
                
                audio.ontimeupdate = () => {
                    setCurrentTime(audio.currentTime);
                }
                audio.onended = () => {
                    configMusic((musicIndex + 1) % musicas.length);
                }
            }
        }, [audio])

       const playPause = () => {
            if(isPlaying){
                audio.pause();
                setPlaying(false);
            } else {
                audio.play();
                setPlaying(true);
                 
            }
        }

        const configMusic = (index: number) =>{
            
            setMusicIndex(index); 

            audio.pause();
            const novoAudio = new Audio(`audios/${musicas[index].audio}`);
            setAudio(novoAudio);
            setCurrentTime(0);
        }

        const configTime = (time: number) => {
            audio.currentTime = time;
            setCurrentTime(time);
        }

        const configVolume = (volume: number) => {
            audio.volume = volume;
            setVolume(volume);
        }
    return(
        <HomeContext.Provider value = 
            {
                {
                    audio,
                    isPlaying,
                    musicas,
                    musicIndex,
                    playPause,
                    currentTime,
                    volume,
                    configVolume,
                    configTime,
                    configMusic,
                    duration
                }
                
            }
        >
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;