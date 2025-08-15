import { atom } from "recoil";

export const moveAtom = atom<String[]>({
    key: "moveAtom",
    default: []
});