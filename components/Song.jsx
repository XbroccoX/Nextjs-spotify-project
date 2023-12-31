import React, { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { isSearchingState } from "../atoms/searchAtom";
const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const isSearching = useRecoilValue(isSearchingState);
  const [trackIsInYourMusic, setTrackIsInYourMusic] = React.useState(false);

  let songItem = track;
  if (!isSearching) {
    songItem = track.track;
  }

  const playSong = () => {
    setCurrentTrackId(songItem.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [songItem.uri] });
  };

  const handleFavoriteSong = () => {
    spotifyApi
      .addToMySavedTracks([songItem.id])
      .then((res) => {
        setTrackIsInYourMusic(true);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  useEffect(() => {
    spotifyApi.containsMySavedTracks([songItem.id]).then(
      function (data) {
        setTrackIsInYourMusic(data.body[0]);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

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
          src={songItem?.album?.images[0]?.url}
          alt="image of track"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{songItem.name}</p>
          <p className="w-40">{songItem.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{songItem.album.name}</p>
        <button
          disabled={trackIsInYourMusic}
          className="z-20 cursor-pointer button"
          onClick={handleFavoriteSong}
        >
          {trackIsInYourMusic ? (
            <FilledHeartIcon className="text-green-400 w-5 h-5 " />
          ) : (
            <HeartIcon className="text-white w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Song;
