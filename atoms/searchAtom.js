import { atom } from "recoil";

export const searchTrackState = atom({
  key: "searchTrackState",
  default: [],
});
export const isSearchingState = atom({
  key: "isSearchingState",
  default: null,
});
