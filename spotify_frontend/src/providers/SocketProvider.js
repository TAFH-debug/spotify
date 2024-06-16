import {createContext, useContext, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import axiosInstance from "../axios/axiosInstance";

const SocketContext = createContext(null);

const SocketProvider = ({children}) => {
    const socket = useRef(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosInstance.get("/users").then((res) => {
            setUsers(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })

        axiosInstance.get("/me").then((res) => {
            socket.current.auth = {email: res.data.email};
            socket.current.connect();
        }).catch((err) => {
            console.log(err);
        })

        socket.current = io("http://localhost:3000", { autoConnect: false });

        socket.current.on("connect", () => {
            console.log("connected");
        });

        socket.current.on("users", (users) => {
            console.log(users);
            setUsers((_) => users);
        });

        socket.current.on("disconnect", () => {
            console.log("disconnected");
        });

        const wsCurrent = socket.current;

        return () => {
            wsCurrent.close();
        };
    }, []);


    const onListen = (songId) => {
        socket.current.emit("listen", songId);
    }


    return (
        <SocketContext.Provider value={{socket, users, onListen}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext);
}

export default SocketProvider;