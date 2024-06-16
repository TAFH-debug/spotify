import React, {useEffect, useState} from "react";
import {useSocket} from "../../providers/SocketProvider";
import axiosInstance from "../../axios/axiosInstance";
import axios from "axios";

export default function UsersActivity() {
  const { socket, users, onListen } = useSocket();
  const [song, setSong] = useState("");

  console.log(users);
  return (
    <div className="border-t border-gray-700 mt-8 pt-4">
      <h4 className="text-white text-lg font-bold mb-4">Users Activity</h4>
      <div className="flex flex-col gap-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {
            users.map((user, index) => (
                <SingleUserActivity user={user} songId={user.lastSongId} key={index} />
            ))
        }
      </div>
    </div>
  );
}

function SingleUserActivity({ user, songId }) {
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState("");

  useEffect(() => {
    if (songId === undefined) return;
    axiosInstance.get(`/songs/${songId}`).then((res) => {
      setSong(res.data);
      axiosInstance.get(`/users/${res.data.artistId}`).then((res) => {
        setArtist(res.data.username);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }, [songId]);

  if (song === null) return;

  const date = user.lastActivity.split(":")[0].split("T")[0];
  const hour = user.lastActivity.split(":")[0].split("T")[1];
  const minutes = user.lastActivity.split(":")[1];
  return (
      <div>
        <h5 className="text-white font-bold">{user.username}</h5>
        <p className="text-gray-400">{song.name} • {artist}</p>
        <p className="text-gray-400">{song.playlistId.name}</p>
        <p className="text-gray-400">{user.isOnline ? "Listening Now" : "Last active: " + date + " " + hour + ":" + minutes }</p>
      </div>
  );
}
