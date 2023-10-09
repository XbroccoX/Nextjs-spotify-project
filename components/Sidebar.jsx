import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusCircleIcon,
  HeartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlistAtom";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  const [playlist, setPlaylist] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylist(res.body.items);
      });
    }
  }, [session, spotifyApi]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        className={`z-0 text-[#b3b3b3] text-sm sm:pr-0 border-gray-900 px-2 py-2 space-y-2 fixed top-0 left-0 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 overflow-y-scroll h-screen scrollbar-hide`}
        aria-label="Sidebar"
      >
        <div
          className={`flex flex-col gap-4 bg-[#121212] px-3 py-2 rounded-xl `}
        >
          <button className="flex items-center space-x-5  hover:text-white px-3 py-1">
            <HomeIcon className="h-5 w-5  " />
            <p className="">Home</p>
          </button>
        </div>

        <div className="flex flex-col gap-4 bg-[#121212] px-3 py-2 rounded-xl">
          <button className="flex items-center space-x-5  hover:text-white px-3 py-1">
            <BookOpenIcon className="h-5 w-5 " />
            <p className="">Your library</p>
          </button>
          <button className="flex items-center space-x-5 hover:text-white px-3 py-1">
            <HeartIcon className="h-5 w-5 " />
            <p className="">Liked Songs</p>
          </button>
          <button className="flex items-center space-x-5 hover:text-white px-3 py-1">
            <PlusCircleIcon className="h-5 w-5 " />
            <p className="">Your Episodes</p>
          </button>

          {/* Playlist */}
          <div className="space-y-2 px-3 py-1">
            {playlist.map((item) => (
              <p
                key={item.id}
                onClick={() => setPlaylistId(item.id)}
                className="cursor-pointer hover:text-white"
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
