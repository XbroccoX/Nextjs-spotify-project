import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import useSpotify from "../hooks/useSpotify";
import { useRecoilState, useRecoilValue } from "recoil";
import { set, shuffle } from "lodash";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import {
  isFavoriteState,
  playlistIdState,
  playlistState,
} from "../atoms/playlistAtom";
import { isSearchingState, searchTrackState } from "../atoms/searchAtom";
import Songs from "./Songs";
import Spinner from "./UI/Spinner";
import TracksSearch from "./TracksSearch";
import AndesLogo from "../public/images/andeslogo.png";

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
  const [searchSongs, setSearchSongs] = useRecoilState(searchTrackState);
  const [isSearching, setIsSearching] = useRecoilState(isSearchingState);
  const [isFavorite, setIsFavorite] = useRecoilState(isFavoriteState);
  const playlistId = useRecoilValue(playlistIdState);
  const [isLoading, setIsLoading] = useState(false);

  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => {
        console.log("playlist normal", res.body);
        setPlaylist(res.body);
      })
      .catch((err) => {
        console.log("Hay un error al momento de traer la playlist", err);
      });
  }, [spotifyApi, playlistId]);

  useEffect(() => {
    setBgColor(shuffle(color).pop());
  }, [playlistId]);

  useEffect(() => {
    console.log("se ejecuta");
    spotifyApi
      .getMySavedTracks({
        limit: 20,
        offset: 0,
      })
      .then(
        function (res) {
          setPlaylist(res.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [isFavorite, spotifyApi]);

  //  METHODS HANDLERS AND FUNCTIONS
  const handleOnChangeInput = (e) => {
    // setSearchText(e.target.value);
    if (e.target.value === "") {
      setIsLoading(false);
      setIsSearching(null);
    } else {
      setIsLoading(true);
      setIsSearching(e.target.value);
    }
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (isSearching === "" || isSearching === null) {
      setIsSearching(null);
      return;
    }
    setIsLoading(true);
    setIsSearching(isSearching);
    spotifyApi
      .searchTracks(isSearching)
      .then((res) => {
        setIsLoading(false);
        setSearchSongs(res.body);
      })
      .catch((err) => {
        console.log("Hay un error al momento de traer la playlist", err);
      });
  };

  return (
    <div className=" sm:ml-64 h-screen bg-[#121212] rounded-xl overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 ">
        <div
          onClick={() => signOut()}
          className=" cursor-pointer flex items-center bg-[#18d860] sm:bg-black space-x-1 sm:space-x-3 opacity-90 hover:opacity-80  rounded-full p-1 pr-2"
        >
          <Image
            className="rounded-full sm:block w-5 h-5 sm:w-10 sm:h-10"
            width={40}
            height={40}
            src={session?.user?.image}
            alt="profile picture"
          />
          <h2 className="text-white hidden md:inline">
            {session?.user?.username}
          </h2>
          <ChevronDownIcon className="w-5 h-5 text-white" />
        </div>
      </header>
      <section className="fixed py-2 px-8 w-full sm:w-[45%] lg:w-3/5 ">
        <form className="relative" onSubmit={handleSearchClick}>
          <input
            value={isSearching}
            onChange={handleOnChangeInput}
            type="search"
            id="default-search"
            className="block w-full p-1 sm:p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Songs, Albums, Artists..."
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 sm:bottom-2.5 bottom-[5px] bg-[#18d860] opacity-90 hover:opacity-60 focus:ring-4 focus:outline-none focus:ring-[#18d860] font-medium rounded-full text-sm px-1 py-0 sm:px-4 sm:py-2 dark:bg-[#18d860] dark:hover:bg-[#18d860] dark:focus:ring-[#18d860]"
          >
            🔎
          </button>
        </form>
      </section>
      {isLoading ? (
        <Spinner />
      ) : !isSearching ? (
        <>
          <section
            className={`flex pt-10 sm:pt-20 md:pt-0 items-end space-x-7 bg-gradient-to-b to-black ${bgColor} md:h-80  text-white p-8`}
          >
            <Image
              className="hidden lg:block"
              src={playlist?.images ? playlist?.images?.[0]?.url : AndesLogo}
              width={150}
              height={150}
              alt="image of playlist"
            />
            <div className="flex flex-col items-start space-y-2">
              <h1 className="text-xl lg:text-5xl font-bold">
                {playlist?.name ? playlist?.name : "Andes Favorite Songs"}
              </h1>
              <div className="flex flex-col space-y-1 md:flex-row md:space-x-3 md:space-y-0">
                <p className="text-sm">
                  {playlist?.owner ? playlist?.owner?.display_name : ""}
                </p>
                <p className="text-sm">
                  {playlist?.tracks ? playlist?.tracks?.total : playlist?.total}{" "}
                  canciones
                </p>
              </div>
              <p className="hidden sm:block text-sm">
                {playlist?.description ? playlist?.description : ""}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-3 lg:space-y-0">
              <button className="bg-gray-700 text-white rounded-full px-2 py-1 md:px-4 md:py-2 font-bold cursor-default">
                SIGUIENDO
              </button>
            </div>
          </section>
          <section>
            <Songs />
          </section>
        </>
      ) : (
        <section>
          <TracksSearch />
        </section>
      )}
    </div>
  );
};

export default Center;
