import {Navigate, Route, Routes} from "react-router-dom";
import { Home } from "../pages/home";
import { Signup } from "../pages/signup";
import { Signin } from "../pages/singin";
import {Profile} from "../pages/profile";
import {CreatePlaylist} from "../pages/new_playlist";
import {UserPage} from "../pages/user";
import {PlaylistPage} from "../pages/playlist";
import {Layout} from "./layout";
import {CreateSong} from "../pages/create_song";
import {Search} from "../pages/search";
import {Favorites} from "../pages/favorites";

function ProtectedRoute(props) {
    if (localStorage.getItem("token") === null) {
        return <Navigate to="/signin" />
    }

    return (
        props.element
    )
}

export const RouteList = () => {
    return (<>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                <Route path="/new_playlist" element={<ProtectedRoute element={<CreatePlaylist />} />} />
                <Route path="/new_song" element={<ProtectedRoute element={<CreateSong />} />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/search/" element={<Search />} />
                <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
            </Route>
        </Routes>
    </>);
};
