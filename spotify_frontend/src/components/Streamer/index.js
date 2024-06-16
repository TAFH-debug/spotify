import React, {useEffect, useRef, useState} from "react";
import {useMusic} from "../../providers/MusicProvider";
import axiosInstance from "../../axios/axiosInstance";
import {RiPlayFill, RiStopFill} from "react-icons/ri";
import {useSocket} from "../../providers/SocketProvider";

export const Streamer = () => {
    const context = useMusic();
    const { socket, users, onListen } = useSocket();

    const [song, setSong] = useState({
        name: "",
        image: "",
        artistId: "",
        s3ref: "",
        _id: ""
    });
    const [author, setAuthor] = useState("");
    const [stop, setStop] = useState(false);
    const audio = useRef(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (context.song === null || context.song === "") return;
        onListen(context.song);
        axiosInstance.get(`/songs/${context.song}`).then((res) => {
            setSong(res.data);
            axiosInstance.get(`/users/${res.data.artistId}`).then((res) => {
                setAuthor(res.data.username);
            })
        }).catch((err) => {
            console.log(err);
        })
        if (audio.current === null) return;
        audio.current.currentTime = 0;
        audio.current.play();
        stopAudio(true);
    }, [context.song]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    const stopAudio = (stop) => {
        if (audio.current === null) return;
        if (stop) {
            audio.current.play();
            setStop(false);
        }
        else {
            audio.current.pause();
            setStop(true);
        }
    }

    return (<>
        <div className="fixed bottom-0 w-full bg-black z-50 p-5">
            <div className="w-full h-full flex items-center justify-center">
                <img src={song.image} alt="" className="rounded-lg h-14 w-14 "/>
                <div className="m-2">
                    <div className="mx-4 text-white font-bold text-2xl">{song.name}</div>
                    <div className="mx-4 text-white">{author}</div>
                </div>
                {
                    song.s3ref !== "" ? <audio src={song.s3ref} preload="metadata" id="audio" ref={audio} autoPlay={true}
                                                                    onTimeUpdate={() => setTime(Math.floor(audio.current === null ? 0 : audio.current.currentTime))}>
                    </audio> : <></>
                }
                <button className="m-3" onClick={() => stopAudio(stop)}>
                    {
                        stop ? <RiPlayFill className="w-6 h-6"/> : <RiStopFill className="w-6 h-6"/>
                    }
                </button>
                <span id="current-time" className="font-bold">{calculateTime(time)}</span>
                <input type="range" id="seek-slider" max={Math.floor(audio.current === null ? 0 : audio.current.duration)} value={time} className="w-3/5 m-2"
                       onChange={(e) => {
                           if (audio.current === null) return;
                           setTime(e.target.value);
                           audio.current.currentTime = e.target.value;
                       }}
                />
                <span id="duration" className="font-bold">{calculateTime(audio.current === null ? 0 : audio.current.duration)}</span>
            </div>
        </div>
    </>)
}