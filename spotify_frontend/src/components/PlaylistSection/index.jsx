import React from "react";
import { Link } from "react-router-dom";
import { PlaylistsCard } from "../PlaylistCard";

export const Playlistsection = ({ title, playlists, className, del }) => {
  return (
    <div className={"mb-8 " + className}>
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
            {title !== undefined ? title : "Playlists"}
        </Link>
        <Link
          to="/"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {playlists.map((playlist, index) => (
          <PlaylistsCard
            key={index}
            id={playlist._id}
            title={playlist.name}
            description={playlist.description}
            imageUrl={playlist.image}
            del={del}
          />
        ))}
      </div>
    </div>
  );
};
