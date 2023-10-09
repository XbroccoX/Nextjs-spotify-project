import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ArrowPathRoundedSquareIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(null);

  const songInfo = useSongInfo();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      setVolumeDebounced(volume);
    }
  }, [volume]);

  //   METHODS HANDLERS AND FUNCTIONS
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((res) => {
        console.log("Now playing: ", res.body?.item);
        setCurrentTrackId(res.body?.item?.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((res) => {
        setIsPlaying(res.body?.is_playing);
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  const setVolumeDebounced = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        console.log("Error al cambiar el volumen", err);
      });
    }, 500),
    []
  );

  return (
    <div className="h-20  rounded-lg text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <Image
          width={60}
          height={60}
          className="hidden md:inline  rounded-md"
          src={songInfo?.album.images?.[0].url}
          alt="track image"
        />
        <div className="flex flex-col">
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly">
        {/* <ArrowsRightLeftIcon className="button" /> */}
        {/* <BackwardIcon className="button" /> */}
        {isPlaying ? (
          <PauseCircleIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        )}
        {/* <ForwardIcon className="button" /> */}
        {/* <ArrowPathRoundedSquareIcon className="button" /> */}
      </div>
      {/* Right */}
      <div className="flex items-center justify-end space-x-2">
        <SpeakerWaveIcon className="w-5 h-5" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-28   "
        />
      </div>
    </div>
  );
};

export default Player;
