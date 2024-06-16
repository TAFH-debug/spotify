import { Outlet } from 'react-router-dom';
import {MusicProvider} from "../providers/MusicProvider";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Streamer} from "../components/Streamer";
import {ToastContainer} from "react-toastify";
import React, {useState} from "react";
import SocketProvider from "../providers/SocketProvider";
import {ModalProvider} from "../providers/ModalProvider";

export const Layout = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    return <div className="min-h-screen text-gray-300">
        <SocketProvider>
            <MusicProvider>
                <ModalProvider>
                    <Header setShowSidebar={setShowSidebar}/>
                    <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
                    <Outlet/>
                    <Streamer/>
                    <ToastContainer/>
                </ModalProvider>
            </MusicProvider>
        </SocketProvider>
    </div>
}