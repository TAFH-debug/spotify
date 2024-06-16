import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance";
import {useUpload} from "../../hooks/hooks";
import {Footer} from "../../components/footer";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


export const CreateSong = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [song, setSong] = useState({
        name: "",
        s3ref: "",
        image: "",
        playlistId: "",
    });

    const { uploadForm:uploadImage, isLoading, progress } = useUpload();
    const { uploadForm:uploadMp3, isLoading:isLoading2, progress:progress2 } = useUpload();

    useEffect(() => {
        axiosInstance.get("/playlist").then((res) => {
            setPlaylists(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleImage = async (e) => {
        const formData = new FormData();
        if (e.target.files !== null) formData.append("file", e.target.files[0]);
        setSong({...song, image: "a"});

        uploadImage(formData).then((res) => {
            setSong({
                ...song,
                image: res.data.url
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleMp3 = async (e) => {
        const formData = new FormData();
        if (e.target.files !== null) formData.append("file", e.target.files[0]);
        setSong({...song, s3ref: "a"});

        uploadMp3(formData).then((res) => {
            setSong({
                ...song,
                s3ref: res.data.url
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const save = async () => {
        if (song.name === "" || song.playlistId === "" || song.image === "" || song.s3ref === "") {
            toast("Please fill all fields", {
                position: "top-right",
                type: "error"
            })
            console.log(song);
            return;
        }
        axiosInstance.post("/songs", song).then((res) => {
            navigate("/")
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="bg-custom-section pt-28 md:pl-72 p-8 min-h-screen">
            <div className="text-center flex flex-col items-center my-10">
                <h1 className="text-4xl font-bold my-3">Create song</h1>
                <span className="mt-5 font-bold text-2xl">Song name: </span>
                <input
                    className="my-5 text-2xl bg-black focus:outline-none rounded-lg border-2 border-white p-2"
                    value={song.name}
                    onChange={(e) => setSong({...song, name: e.target.value})}
                />
                <span className="mt-5 font-bold text-2xl">Song playlist: </span>
                <select
                    className="my-5 text-2xl bg-black focus:outline-none rounded-lg border-2 border-white p-4"
                    value={song.playlistId}
                    onChange={(e) => {
                        setSong({...song, playlistId: e.target.value})
                    }}
                >
                    <option selected="selected" value={""}>CHOOSE PLAYLIST</option>
                    {
                        playlists.map((playlist) => {
                            return <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
                        })
                    }
                </select>
                <label className="input-file">
                <input type="file" name="file" accept="image/png, image/jpeg" onChange={handleImage}/>
                    <span>Choose song image</span>
                </label>
                {
                    song.image !== "" ?
                        <div className="flex relative items-center justify-center w-40 h-40">
                            {
                                isLoading ? <div className="absolute rounded-lg w-4/5 bg-gray-500 h-5">
                                    <div className="rounded-lg h-full bg-green-500"
                                         style={{width: `${progress}%`}}></div>
                                </div> : <></>
                            }
                            <img className="w-full h-full rounded-lg cursor-pointer" src={song.image} alt=""/>
                        </div> : <></>
                }

                <label className="input-file">
                    <input type="file" name="file" accept="audio/*" onChange={handleMp3}/>
                    <span>Choose song source</span>
                </label>
                {
                    song.s3ref !== "" ?
                        <div className="flex relative items-center justify-center p-10">
                            {
                                isLoading2 ? <div className="absolute rounded-lg w-4/5 bg-gray-500 h-5">
                                    <div className="rounded-lg h-full bg-green-500"
                                         style={{width: `${progress2}%`}}></div>
                                </div> : <></>
                            }
                            <a href={song.s3ref}
                               className="p-4 rounded-lg cursor-pointer bg-gray-400 m-2">{song.s3ref.split("/").reverse()[0]}</a>
                        </div> : <></>
                }

                <button className="rounded-lg bg-green-500 text-white font-bold py-2 px-4" onClick={save}>
                    Create
                </button>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
}