import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import TracksSearch from "./TracksSearch";
import { isSearchingState, searchTrackState } from "../atoms/searchAtom";
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
  const playlistId = useRecoilValue(playlistIdState);
  const [isLoading, setIsLoading] = useState(false);

  const [bgColor, setBgColor] = useState(null);
  const [searchText, setSearchText] = useState("");

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
  useEffect(() => {
    setBgColor(shuffle(color).pop());
  }, [playlistId]);

  //  METHODS HANDLERS AND FUNCTIONS
  const handleOnChangeInput = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setIsLoading(false);
      setIsSearching(false);
    } else {
      setIsLoading(true);
      setIsSearching(true);
    }
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    spotifyApi
      .searchTracks(searchText)
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
            value={searchText}
            onChange={handleOnChangeInput}
            type="search"
            id="default-search"
            className="block w-full p-1 sm:p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Songs, Albums, Artists..."
            required
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
        <div
          className="h-screen flex justify-center items-center"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="inline w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : !isSearching ? (
        <>
          <section
            className={`flex pt-10 sm:pt-20 md:pt-0 items-end space-x-7 bg-gradient-to-b to-black ${bgColor} md:h-80  text-white p-8`}
          >
            <Image
              className="hidden lg:block"
              src={playlist?.images?.[0]?.url}
              width={150}
              height={150}
              alt="image of playlist"
            />
            <div className="flex flex-col items-start space-y-2">
              <h1 className="text-xl lg:text-5xl font-bold">
                {playlist?.name}
              </h1>
              <div className="flex flex-col space-y-1 md:flex-row md:space-x-3 md:space-y-0">
                <p className="text-sm">{playlist?.owner?.display_name}</p>
                <p className="text-sm">{playlist?.tracks?.total} canciones</p>
              </div>
              <p className="hidden sm:block text-sm">{playlist?.description}</p>
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
