import Head from 'next/head'
import Image from 'next/image'
import {useContext} from 'react'
import { HomeContext } from '../context/HomeContext'
import { musicas } from '../dados/musicas'
import styles from '../styles/Home.module.css'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleFilledOutlined'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutlineOutlined'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Input } from '@material-ui/core'
import { timeToString } from '../utils/time'
import { meussons } from '../dados/meus'
import { gospel } from '../dados/gospel'


export default function Home() {
  const {
    isPlaying,
    playPause, 
    musicas,
    musicIndex,
    configMusic,
    duration,
    currentTime,
    volume,
    configVolume, 
    configTime, 
  } = useContext(HomeContext);
  
  return (
    <div className={styles.principal}>
   
   
    <div className={styles.container}>
    
  
    <div className = {styles.content}>
    <h1 className = {styles.titulo}>Tocadas Recentimente</h1>
      <div className = {styles.musicList}>
     
      {
       musicas.map((music, index) => {
        return (
          <div onClick = {() => configMusic(index)} key = {music.audio} className = {styles.musicItem}>
            <img src ={`capas/${music.capa}`}/>
            <div className = {styles.musicDetails}>
            
            </div>
          </div >
        )   
       })
      }
      </div>
      <h1 className = {styles.titulo}>Sucessos</h1>
      <div className = {styles.musicList}>
     
     {
      meussons.map((music, index) => {
       return (
         <div onClick = {() => configMusic(index)} key = {music.audio} className = {styles.musicItem}>
           <img src ={`capas/${music.capa}`}/>
           <div className = {styles.musicDetails}>
           
           </div>
         </div >
       )   
      })
     }
     </div>
     <h1 className = {styles.titulo}>Sua Playlist</h1>
     <div className = {styles.musicList}>
     
     {
      gospel.map((music, index) => {
       return (
         <div onClick = {() => configMusic(index)} key = {music.audio} className = {styles.musicItem}>
           <img src ={`capas/${music.capa}`}/>
           <div className = {styles.musicDetails}>
           
           </div>
         </div >
       )   
      })
     }
     </div>

      </div>
    </div>

    <div className = {styles.teste}>    
    <div className = {styles.control}>
            
           

            {isPlaying ?
            
              (<button onClick = {playPause}><PauseCircleOutlineIcon className = {styles.play}/></button>):
              (<button onClick = {playPause}><PlayCircleOutlineIcon className = {styles.play}/></button>)
            }
      
      
      <div className = {styles.imp}>
      <input
         className = {styles.timeControl}
         type = "range"
         min = "0"
         max = {duration}
         value ={currentTime}
          onChange = {(e) => configTime(Number(e.target.value))} 
      />
          <div className = {styles.time}>
            <span>{timeToString(currentTime)}</span>
            <span>{timeToString(duration)}</span >
          </div> 
          <div>
      <input 
            type ="range"
            min = "0"
            max = "1"
            step = "0.01"
            value = {volume}
            onChange = {(e) => configVolume(Number(e.target.value))}
      />
     </div>
       </div> 
    </div>
              
      
  </div>
  </div>
  )
}
