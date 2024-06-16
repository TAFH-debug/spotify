// write modal provider here
import React, {createContext, useContext, useState} from 'react';
import {Modal} from "../components/Modal";

const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [songId, setSongId] = useState("");

    return <ModalContext.Provider value={{ showModal, setShowModal, setSongId, songId }}>
        <Modal show={showModal} setShow={setShowModal}/>
        {children}
    </ModalContext.Provider>
}

const useModal = () => {
    return useContext(ModalContext);
}

export { useModal, ModalProvider };
