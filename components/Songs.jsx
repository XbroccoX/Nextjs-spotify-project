import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white pt-2 flex flex-col space-y-1 pb-28">
      {playlist?.tracks?.items?.length > 0
        ? playlist?.tracks?.items?.map((item, i) => (
            <Song key={item.track.id} track={item} order={i} />
          ))
        : playlist?.items?.map((item, i) => (
            <Song key={item.track.id} track={item} order={i} />
          ))}
    </div>
  );
};

export default Songs;
