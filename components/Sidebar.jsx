import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusCircleIcon,
  HeartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        className={`text-[#b3b3b3] text-sm  border-gray-900 px-3 py-2 space-y-2 fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div
          className={`flex flex-col gap-4 bg-[#121212] px-3 py-2 rounded-xl `}
        >
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-5  hover:text-white px-3 py-1"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5  " />
            <p className="">Logout</p>
          </button>
          <button className="flex items-center space-x-5  hover:text-white px-3 py-1">
            <HomeIcon className="h-5 w-5  " />
            <p className="">Home</p>
          </button>
          <button className="flex items-center space-x-5 hover:text-white px-3 py-1">
            <MagnifyingGlassIcon className="h-5 w-5 " />
            <p className="">Search</p>
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
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
            <p className="cursor-pointer hover:text-white">playlistName</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
