import React from "react";
import useSpotify from "../hooks/useSpotify";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import Song from "./Song";

const RelevantSong = ({ trackInfo }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(trackInfo.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [trackInfo.uri] });
  };
  console.log(trackInfo, "trackInfo");

  return (
    <div className="flex items-center justify-center md:justify-start md:space-x-4 ">
      <div
        onClick={playSong}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          width={120}
          height={120}
          className="object-cover w-1/2 h-auto md:w-2/6 rounded-t-lg md:h-auto  md:rounded-none md:rounded-l-lg"
          src={trackInfo?.album?.images[0]?.url}
          alt={trackInfo?.name}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {trackInfo?.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {trackInfo?.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelevantSong;
