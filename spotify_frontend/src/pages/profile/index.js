import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios/axiosInstance";
import {Footer} from "../../components/footer";
import {useUpload} from "../../hooks/hooks";
import {toast, ToastContainer} from "react-toastify";
import {Playlistsection} from "../../components/PlaylistSection";
import {SongList} from "../../components/SongList";


export const Profile = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        image: "",
        _id: "",
        playlists: [],
        songs: []
    });
    const { uploadForm, isLoading, progress } = useUpload();

    useEffect(() => {
        axiosInstance.get("/me/full").then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleFile = async (e) => {
        const formData = new FormData();
        if (e.target.files !== null) formData.append("file", e.target.files[0]);

        uploadForm(formData).then((res) => {
            setUser({
                ...user,
                image: res.data.url
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const save = async () => {
        await axiosInstance.put(`/users/${user._id}`, user).then((res) => {
            toast("Profile updated", {
                type: "success",
                position: "top-right"
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="min-h-screen text-gray-300">
            <Header setShowSidebar={setShowSidebar}/>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <div className="bg-custom-section pt-28 md:pl-72 p-8">
                <div className="text-center flex flex-col items-center my-10">
                    <h1 className="text-4xl font-bold my-3">Profile</h1>
                    <input type="file" className="hidden" id="file" onChange={handleFile}/>
                    <div className="flex relative items-center justify-center w-40 h-40">
                        {
                            isLoading ? <div className="absolute rounded-lg w-4/5 bg-gray-500 h-5">
                                <div className="rounded-lg h-full bg-green-500" style={{width: `${progress}%`}}></div>
                            </div> : <></>
                        }
                        <img className="w-full h-full rounded-full cursor-pointer" src={user.image} alt="" onClick={() => document.getElementById("file").click()}/>
                    </div>
                    <span className="mt-5 font-bold text-2xl">Username: </span>
                    <input
                        className="my-5 text-2xl bg-black focus:outline-none rounded-lg focus:border-2 border-white p-2"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />

                    <button className="rounded-lg bg-green-500 text-white font-bold py-2 px-4 mb-10" onClick={save}>Save</button>
                </div>
                <Playlistsection playlists={user.playlists} title="My playlists" del/>
                <SongList songs={user.songs} author={user.username} del/>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}