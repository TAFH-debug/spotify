import React, {useEffect, useState} from "react";
import "./styles.css";
import {useMusic} from "../../providers/MusicProvider";
import axiosInstance from "../../axios/axiosInstance";
import {RiDeleteBin2Fill, RiHeartFill} from "react-icons/ri";
import {useModal} from "../../providers/ModalProvider";
import {useNavigate} from "react-router-dom";

export const SongList = ({ songs, author, del }) => {
    return (<>
        <div className="text-3xl font-bold mx-5 my-3">Songs</div>
        <div className="w-full">
            {
                songs.map((song, index) => <SongCard song={song} index={index} author={author} del={del}/>)
            }
        </div>
    </>)
}

export const SongCard = ({ song, index, auth, del }) => {
    const context = useMusic();
    const [author, setAuthor] = useState(auth || "");
    const modalContext = useModal();
    const navigate = useNavigate();

    useEffect(() => {
        if (author === "") {
            axiosInstance.get(`/users/` + song.artistId).then((res) => {
                setAuthor(res.data.username);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, []);

    const play = () => {
        context.setSong(song._id);
    }

    const onDelete = (e) => {
        axiosInstance.delete(`/songs/` + song._id).catch((err) => {
            console.log(err);
        })
        navigate('/')
    }

    const addFavorites = (e) => {
        if (localStorage.getItem("token") === null) return;
        axiosInstance.get(`/songs/` + song._id + "/favorite").catch((err) => {
            console.log(err);
        })
        e.stopPropagation();
    }

    const click = (e) => {
        if (localStorage.getItem("token") === null) return;
        modalContext.setSongId(song._id);
        modalContext.setShowModal(true);
        e.stopPropagation();
    }

    return <div key={index} className="flex rounded-lg w-full hover:bg-gray-900 p-5 items-center card cursor-pointer"
                 onClick={play}>
        <span className="m-4 text-gray-500 text-xl">{index !== undefined ? index + 1 : ""}</span>
        <img src={song.image} alt="" className="rounded-lg h-14 w-14"/>
        <div className="">
            <div className="mx-4 text-white font-bold text-2xl">{song.name}</div>
            <div className="mx-4 text-white">{author}</div>
        </div>
        <button className="ml-auto mr-5 text-white font-bold" onClick={!del ? addFavorites : onDelete}>
            {
                del ? <RiDeleteBin2Fill className="w-8 h-8 hover:text-red-500"/> :
                    <RiHeartFill className="w-8 h-8"/>
            }
        </button>
        <button className="ml-auto mr-5 text-white font-bold" onClick={click}>
            Add to...
        </button>
    </div>
}