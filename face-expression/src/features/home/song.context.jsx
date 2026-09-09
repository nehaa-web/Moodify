import {  createContext, useState } from "react";

export const SongContext = createContext()


export const SongContextProvider = ({children}) => {
    const [song, setSong] = useState({
"url":"https://ik.imagekit.io/7ii02yeju/moodify/songs/song_0XjoAnZrH.mp3",
"posterUrl" : "https://ik.imagekit.io/7ii02yeju/moodify/songs/song_OI36b7d_4.jpg",
"title" :"song",
"mood" : "happy"
    })

    const [loading, setLoading] = useState(false)

    return (
       <SongContext.Provider 
       value={{ loading , setLoading , song , setSong}}>
        {children}
       </SongContext.Provider>
    )
}