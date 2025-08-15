import { atom } from "recoil";

export const playerAtom = atom<null|"black"|"white">({
    key: 'playerAtom',
    default: null
});