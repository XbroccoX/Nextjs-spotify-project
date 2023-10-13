import { useState } from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = ({ currentPage }) => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white pt-2 flex flex-col space-y-1 pb-28">
      {playlist?.tracks?.items?.length > 0
        ? playlist?.tracks?.items
            ?.slice(currentPage, currentPage + 10)
            ?.map((item, i) => (
              <Song key={item.track.id} track={item} order={i} />
            ))
        : playlist?.items
            ?.slice(currentPage, currentPage + 10)
            ?.map((item, i) => (
              <Song key={item.track.id} track={item} order={i} />
            ))}
    </div>
  );
};

export default Songs;
