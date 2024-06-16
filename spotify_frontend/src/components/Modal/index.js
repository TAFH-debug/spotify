import {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance";
import {useModal} from "../../providers/ModalProvider";

export const Modal = ({ show, setShow }) => {
    const [playlists, setPlaylists] = useState([]);
    const context = useModal();

    useEffect(() => {
        axiosInstance
            .get("/playlist")
            .then((res) => {
                setPlaylists(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onClick = (id) => {
        axiosInstance
            .post("/playlist/add_song", {
                playlistId: id,
                songId: context.songId,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setShow(false);
    }

    return (
        <div>
            {show && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="relative bg-main-bg rounded-lg p-4 w-1/5 h-3/5 bg-black">
                        <button
                            onClick={() => setShow(false)}
                            className="absolute top-2 right-2 text-2xl text-gray-100"
                        >
                            &times;
                        </button>
                        <label>Choose playlist...</label>
                        {
                            playlists.map((playlist) => {
                                return (
                                    <div key={playlist._id}
                                         onClick={() => onClick(playlist._id)}
                                         className="flex rounded-lg items-center gap-4 p-4 hover:bg-gray-900 cursor-pointer">
                                        <img
                                            src={playlist.image}
                                            alt="Album"
                                            className="w-20 h-20 rounded-xl drop-shadow-2xl"
                                        />
                                        <div>
                                            <h5 className="font-medium text-gray-100 text-xl mb-2">{playlist.name}</h5>
                                            <p className="text-gray-400 text-xl">{playlist.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    )
}