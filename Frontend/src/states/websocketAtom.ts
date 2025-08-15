import { atom } from "recoil";

export const wsAtom = atom<WebSocket|null>({
    key: 'wsAtom',
    default: null
});