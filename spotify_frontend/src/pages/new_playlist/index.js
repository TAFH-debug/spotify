import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React, {useState} from "react";
import './PlaylistPage.css';
import axiosInstance from "../../axios/axiosInstance";
import {useNavigate} from "react-router-dom";
import {Footer} from "../../components/footer";
import {useUpload} from "../../hooks/hooks";

export const CreatePlaylist = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const [state, setState] = useState({
        name: "",
        description: "",
        image: ""
    });
    const { uploadForm, isLoading, progress } = useUpload();

    const send = async () => {
        if (state.name === "" || state.description === "" || state.image === "") return;
        const res = await axiosInstance.get("/me");
        axiosInstance.post("/playlist", {
            name: state.name,
            description: state.description,
            image: state.image,
            userId: res.data._id
        }).then(
            () => navigate("/")
        ).catch((err) => {
            console.log(err);
        });
    }

    const handleFile = async (e) => {
        const formData = new FormData();
        setState({...state, image: "a"});
        if (e.target.files !== null) formData.append("file", e.target.files[0]);

        uploadForm(formData).then((res) => {
            setState({
                ...state,
                image: res.data.url
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    return <>
        <div className="min-h-screen text-gray-300">
            <Header setShowSidebar={setShowSidebar}/>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <div className="bg-custom-section pt-28 md:pl-72 p-8 min-h-screen">
                <div className="text-center flex flex-col items-center my-10">
                    <h1 className="text-4xl font-bold my-3">Create new playlist</h1>
                    <span className="mt-5 font-bold text-2xl">Playlist image: </span>
                    <input type="file" className="hidden" id="file2" onChange={handleFile}/>
                    <label className="input-file">
                        <input type="file" name="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                        <span>Выберите файл</span>
                    </label>
                    {
                        state.image !== "" ? <div className="flex relative items-center justify-center w-40 h-40">
                            {
                                isLoading ? <div className="absolute rounded-lg w-4/5 bg-gray-500 h-5">
                                    <div className="rounded-lg h-full bg-green-500"
                                         style={{width: `${progress}%`}}></div>
                                </div> : <></>
                            }
                            <img className="w-full h-full rounded-lg cursor-pointer" src={state.image} alt="" />
                        </div> : <></>
                    }
                    <span className="mt-5 font-bold text-2xl">Name: </span>
                    <input
                        className="my-5 text-2xl bg-black focus:outline-none rounded-lg border-2 border-white p-2"
                        value={state.name} onChange={(e) => setState({...state, name: e.target.value})}/>
                    <span className="mt-5 font-bold text-2xl">Description: </span>
                    <input
                        className="my-5 text-2xl bg-black focus:outline-none rounded-lg border-2 border-white p-2"
                        value={state.description} onChange={(e) => setState({...state, description: e.target.value})}/>
                    <button className="rounded-lg bg-green-500 text-white font-bold py-2 px-4" onClick={send}>Create
                    </button>
                </div>
                <Footer/>
            </div>
        </div>
    </>
}