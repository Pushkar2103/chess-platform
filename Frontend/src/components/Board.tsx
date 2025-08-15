import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardState } from "../states/boardState";
import { playerAtom } from "../states/playerAtom";
import { wsAtom } from "../states/websocketAtom";
import { MOVE } from "../states/messages";
import { moveAtom } from "../states/moveAtom";
import { turnAtom } from "../states/turnAtom";

type PieceProps = {
  square: String;
  type: String;
  color: String;
} | null;

function Board() {
  let a = 0;
  const board = useRecoilValue(boardState);
  const setBoard = useSetRecoilState(boardState);
  const player = useRecoilValue(playerAtom);
  const socket = useRecoilValue(wsAtom);
  const setTurn = useSetRecoilState(turnAtom);
  const setMoves = useSetRecoilState(moveAtom);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, to: string) => {
    e.preventDefault();
    const pieceData = e.dataTransfer.getData("piece");
    const piece = JSON.parse(pieceData);
    const from = piece.square;
    
    if(socket) {
        socket.send(JSON.stringify({type:MOVE, move:{from:from, to:to}}));
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if(message.type === MOVE) {
                setMoves((moves) => [...moves, message.move]);
                setTurn((turn)=> turn=="white"?"black":"white");
                setBoard(message.board)
            }
        }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-8 lg:w-[600px] lg:h-[600px] md:w-[450px] md:h-[450px]">
      {[...Array(64)].map((_, i) => {
        const piece: PieceProps = player === "white" 
          ? board[Math.floor(i / 8)][i % 8] 
          : board[Math.floor((63 - i) / 8)][(63 - i) % 8];
        
        if (i % 8 === 0) a++;
        const square = player === "white" ?
         `${String.fromCharCode(97 + (i % 8))}${8 - Math.floor(i / 8)}` :
         `${String.fromCharCode(97 + ((63 - i) % 8))}${8 - Math.floor((63 - i) / 8)}`;
        
        return (
          <div
            key={i}
            className={`w-full h-full ${
              (a + i) % 2 === 0 ? "bg-gray-300" : "bg-cyan-950"
            } relative`}
            onDrop={(e) => handleDrop(e, square)}
            onDragOver={handleDragOver}
          >
            <div className="absolute cursor-pointer flex justify-center items-center">
              <Piece p={piece} square={square} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Piece({ p, square }: { p: PieceProps; square: string }) {
  if (p) {
    return (
      <img
        src={`${p.color}${p.type}.png`}
        alt={`${p.color} ${p.type}`}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("piece", JSON.stringify({ ...p, square }));
        }}
      />
    );
  }
  return <div></div>;
}

export default Board;
