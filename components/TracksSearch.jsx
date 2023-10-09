import { useRecoilValue } from "recoil";
import Song from "./Song";
import { searchTrackState } from "../atoms/searchAtom";
import RelevantSong from "./RelevantSong";
import PrincipalSearch from "./PrincipalSearch";

const TracksSearch = () => {
  const trackItems = useRecoilValue(searchTrackState);
  return (
    <div className="text-white pt-2 flex flex-col space-y-1 pb-28">
      <PrincipalSearch tracksSongs={trackItems} />
      {trackItems?.tracks?.items?.slice(5).map((item, i) => {
        return <Song key={item.id} track={item} order={i} />;
      })}
    </div>
  );
};

export default TracksSearch;
