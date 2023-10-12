import Image from "next/image";
import { signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const HeaderUser = ({ session }) => {
  return (
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
  );
};

export default HeaderUser;
