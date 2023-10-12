import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "./useSpotify";

export function useGroupPlaylist() {
  const [playlist, setPlaylist] = useState([]);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    // console.log("RENDER ASIDE LIST");
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylist(res.body.items);
      });
    }
  }, [session, spotifyApi]);

  return { playlist, setPlaylist, spotifyApi, session };
}
