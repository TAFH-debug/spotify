import {createContext, useContext, useState} from "react";

const MusicContext = createContext(null);

const MusicProvider = ({children}) => {
    const [song, setSong] = useState("");

    return <MusicContext.Provider value={{song, setSong}}>
        {children}
    </MusicContext.Provider>
}

const useMusic = () => {
    return useContext(MusicContext);
}

export {useMusic, MusicProvider};