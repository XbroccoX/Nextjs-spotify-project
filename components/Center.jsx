import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const color = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);

  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => {
        setPlaylist(res.body);
      })
      .catch((err) => {
        console.log("Hay un error al momento de traer la playlist", err);
      });
  }, [spotifyApi, playlistId]);
  console.log(playlist);
  useEffect(() => {
    setBgColor(shuffle(color).pop());
  }, [playlistId]);

  return (
    <div className=" sm:ml-64 h-screen bg-[#121212] rounded-xl overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className=" cursor-pointer flex items-center bg-[#18d860] sm:bg-black space-x-3 opacity-90 hover:opacity-80  rounded-full p-1 pr-2"
        >
          <Image
            className="rounded-full hidden sm:block"
            width={40}
            height={40}
            src={session?.user?.image}
            alt="profile picture"
          />
          <h2 className="text-white">{session?.user?.username}</h2>
          <ChevronDownIcon className="w-5 h-5 text-white" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${bgColor} md:h-80  text-white p-8`}
      >
        <Image
          className="hidden lg:block"
          src={playlist?.images?.[0]?.url}
          width={150}
          height={150}
          alt="image of playlist"
        />
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-xl lg:text-5xl font-bold">{playlist?.name}</h1>
          <div className="flex flex-col space-y-1 md:flex-row md:space-x-3 md:space-y-0">
            <p className="text-sm">{playlist?.owner?.display_name}</p>
            <p className="text-sm">{playlist?.tracks?.total} canciones</p>
          </div>
          <p className=" hidden sm:block text-sm">{playlist?.description}</p>
        </div>
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-3 lg:space-y-0">
          <button className="bg-gray-700 text-white rounded-full px-2 py-1 md:px-4 md:py-2 font-bold cursor-default">
            SIGUIENDO
          </button>
          {/* <button className="bg-gray-700 text-white rounded-full px-4 py-2 font-bold">
            ...
          </button> */}
        </div>
      </section>
      <section>
        <Songs />
      </section>
    </div>
  );
};

export default Center;
