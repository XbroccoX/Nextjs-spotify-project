import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { shuffle } from "lodash";

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
  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    setBgColor(shuffle(color).pop());
  }, []);

  return (
    <div className=" sm:ml-64 h-screen bg-[#121212] rounded-xl overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-[#18d860] sm:bg-black space-x-3 opacity-90 hover:opacity-80  rounded-full p-1 pr-2">
          <Image
            className="rounded-full hidden sm:block"
            width={40}
            height={40}
            src={session?.user?.image}
          />
          <h2 className="text-white">{session?.user?.username}</h2>
          <ChevronDownIcon className="w-5 h-5 text-white" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${bgColor} h-80 text-white p-8`}
      ></section>
    </div>
  );
};

export default Center;
