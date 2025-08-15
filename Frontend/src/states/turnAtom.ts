import { atom } from "recoil";

export const turnAtom = atom<"white"|"black">({
    key: "turnAtom",
    default: "white"
});