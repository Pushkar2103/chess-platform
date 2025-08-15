import { useRecoilValue } from "recoil";
import { turnAtom } from "../states/turnAtom";
import { moveAtom } from "../states/moveAtom";

function GameInfo() {
    const turn = useRecoilValue(turnAtom);

    return (
        <div className="bg-gray-400">
            <div>Current Turn: {turn}</div>
            <div>Moves:</div>
            <DisplayMoves/>
        </div>
    );
}

function DisplayMoves() {
    const moves = useRecoilValue(moveAtom);
    const lastfour = moves.slice(-4);
    console.log(lastfour);

    return (
        <div>
            {
                lastfour.map((move)=> {
                    return(
                        <div>
                            {move}
                        </div>
                    )
                })
            }
        </div>
    )
};

export default GameInfo;