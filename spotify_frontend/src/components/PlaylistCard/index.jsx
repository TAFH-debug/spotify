import React from "react";
import {
  RiChatDeleteFill,
  RiCropFill,
  RiCrossFill,
  RiDeleteBackFill, RiDeleteBin2Fill,
  RiDeleteRow,
  RiHeartFill,
  RiPlayFill
} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";

export const PlaylistsCard = ({ title, description, imageUrl, id, del }) => {
  const navigate = useNavigate();

  const addFavorite = (e) => {
    axiosInstance.get(`/playlist/${id}/favorite`).catch((err) => {
      console.log(err);
    })
    e.stopPropagation();
  }

  const onDelete = (e) => {
    axiosInstance.delete(`/playlist/${id}`).catch((err) => {
        console.log(err);
    })
    navigate('/')
  }

  return (
    <Link
      to={"/playlist/" + id}
      className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group w-60"
    >
      <div className="mb-4 relative flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Album"
          className="w-48 h-48 rounded-xl drop-shadow-2xl"
        />
        <button className="p-3 text-3xl bg-main-green rounded-full text-gray absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out bg-[#65D46E] text-black">
          <RiPlayFill />
        </button>
      </div>
      <div className="flex">
        <div className="m-5">
          <h5 className="font-medium text-gray-100 mb-2">{title}</h5>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <button className="m-auto" onClick={!del ? addFavorite : onDelete}>
          {
            del ? <RiDeleteBin2Fill className="w-8 h-8 text-white hover:text-red-500" /> :
                <RiHeartFill className="w-8 h-8 text-green-600 hover:text-red-500"/>
          }
        </button>
      </div>
    </Link>
  );
};
