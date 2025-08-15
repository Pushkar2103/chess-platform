import { useEffect, useState } from "react";
import Board from "../components/Board";
import Loading from "../components/Loading";
import GameInfo from "../components/GameInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { wsAtom } from "../states/websocketAtom";
import { useNavigate } from "react-router-dom";
import { playerAtom } from "../states/playerAtom";
import { INIT_GAME } from "../states/messages";
import { boardState } from "../states/boardState";

function Game() {
    const [loading, setLoading] = useState(true);
    const setPlayer = useSetRecoilState(playerAtom);
    const setBoard = useSetRecoilState(boardState);
    const socket = useRecoilValue(wsAtom);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!socket) {
            console.log("socket not connected");
            navigate('/');
            return;
        }
        
        socket.onmessage = (event)=> {
            const message = JSON.parse(event.data);
            if(message.type === INIT_GAME) {
                setPlayer(message.payload.color);
                setBoard(message.board);
                setLoading(false);
            }
        }

        return () => {
            socket.onmessage = null;
        }
    
    },[socket]);

   return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(chess-bg.jpg)" }}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
        {
            loading ? <Loading/> : <PlayArea/>
        }
      </div>
    </div>
  );
};

function PlayArea() {
    return (
        <div className="w-full flex justify-around">
            <Board/>
            <GameInfo/>
        </div>
    );
};

export default Game;