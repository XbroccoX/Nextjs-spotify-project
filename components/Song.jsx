import React from "react";
import useSpotify from "../hooks/useSpotify";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [track.track.uri] });
  };

  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 py-1 px-5 text-gray-500 cursor-pointer hover:bg-gray-600 hover:text-white"
    >
      <div className="flex items-center space-x-4">
        <p className="hidden md:inline">{order + 1}</p>
        <Image
          width={40}
          height={40}
          src={track.track.album.images[0].url}
          alt="image of track"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <a href={track.track.preview_url} target="_blank">
          <PlayCircleIcon className="text-green-400 w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Song;
