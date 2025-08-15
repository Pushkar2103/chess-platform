import { atom } from "recoil";

type obj = {
    square: String,
    type: String,
    color: String
};

export const boardState = atom<obj[][]>({
    key: "boardState",
    default: []
});