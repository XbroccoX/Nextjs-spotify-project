import React from "react";
import useSpotify from "../hooks/useSpotify";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import Song from "./Song";
import RelevantSong from "./RelevantSong";
import { searchTrackState } from "../atoms/searchAtom";

const PrincipalSearch = ({ tracksSongs }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  console.log(tracksSongs, "tracks");

  return (
    <div
      name="RelevantSong"
      className={`grid grid-cols-1 pt-10 md:grid-cols-2 py-1 sm:pt-16 px-5 text-gray-500 cursor-pointer `}
    >
      <RelevantSong trackInfo={tracksSongs?.tracks?.items[0]} />

      <div
        name="colofSongs"
        className="flex w-full flex-col justify-center items-center "
      >
        {tracksSongs?.tracks?.items?.slice(0, 4).map((item, i) => {
          const playSong = () => {
            setCurrentTrackId(item.id);
            setIsPlaying(true);
            spotifyApi.play({ uris: [item.uri] });
          };
          return (
            <div
              onClick={playSong}
              className=" w-full justify-between py-1 px-5 text-gray-500 cursor-pointer hover:bg-gray-600 hover:text-white hidden md:flex"
            >
              <div className="flex items-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src={item?.album?.images[0]?.url}
                  alt="image of track"
                />
                <div>
                  <p className=" text-white">{item.name}</p>
                  <p className="">{item.artists[0].name}</p>
                </div>
              </div>

              <div className="flex items-center justify-between ml-auto md:ml-0 ">
                <a href={item.preview_url} target="_blank">
                  <PlayCircleIcon className="text-green-400 w-5 h-5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrincipalSearch;
