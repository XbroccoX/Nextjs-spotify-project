import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import useSpotify from "../hooks/useSpotify";
import { useRecoilState, useRecoilValue } from "recoil";
import { set, shuffle } from "lodash";
import debounce from "just-debounce-it";

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
import HeaderUser from "./main/HeaderUser";
import SearchBar from "./main/SearchBar";
import Pagination from "./UI/Pagination";

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
  const [currentPage, setCurrentPage] = useState(0);

  const previousSearch = useRef(setIsSearching);

  const debounceOnChange = useCallback(
    debounce((search) => {
      console.log("search", search);
      spotifyApi
        .searchTracks(search)
        .then((res) => {
          setIsLoading(false);
          setSearchSongs(res.body);
        })
        .catch((err) => {
          console.log("Hay un error al momento de traer la playlist", err);
        });
    }, 500),
    []
  );

  //TRAER PLAYLIST ESPECIFICA
  useEffect(() => {
    if (!playlistId) return;
    setIsLoading(true);
    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => {
        setIsLoading(false);
        setPlaylist(res.body);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Hay un error al momento de traer la playlist", err);
      });
  }, [spotifyApi, playlistId]);

  // TRAER FAVORITOS
  useEffect(() => {
    // console.log("se ejecuta");
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

  //CAMBIO DE COLORES
  useEffect(() => {
    setBgColor(shuffle(color).pop());
  }, [playlistId]);

  //  METHODS HANDLERS AND FUNCTIONS
  const handleOnChangeInput = (e) => {
    const newQuery = e.target.value;
    if (newQuery.startsWith(" ")) {
      setIsSearching(null);
      return;
    }
    if (newQuery === "") {
      setIsLoading(false);
      setIsSearching(null);
    } else {
      setIsLoading(true);
      setIsSearching(e.target.value);
      debounceOnChange(e.target.value);
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (previousSearch.current === isSearching) return;

    if (isSearching === "" || isSearching === null) {
      setIsSearching(null);
      return;
    }

    setIsLoading(true);
    setIsSearching(isSearching);
    previousSearch.current = isSearching;
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
  const handleNextPage = () => {
    if (currentPage + 20 > playlist?.limit) return;
    setCurrentPage(currentPage + 10);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  return (
    <div className=" sm:ml-64 h-screen bg-[#121212] rounded-xl overflow-y-scroll scrollbar-hide">
      <HeaderUser session={session} />
      <SearchBar
        handleOnSubmit={handleOnSubmit}
        isSearching={isSearching}
        handleOnChangeInput={handleOnChangeInput}
      />
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
            <Pagination
              nextPage={handleNextPage}
              prevPage={handlePrevPage}
              currentPage={currentPage}
            />
          </section>
          <section>
            <Songs currentPage={currentPage} />
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
