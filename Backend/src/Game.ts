import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;

    constructor(p1: WebSocket, p2: WebSocket) {
        this.player1 = p1;
        this.player2 = p2;
        this.board = new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            },
            board: this.board.board()
        }));
        
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            },
            board: this.board.board()
        }));
    }

    makeMove(player: WebSocket, move: {
        from: string,
        to: string
    }) {
        if(this.board.turn()==='w' && player !== this.player1) {
            return;
        }
        if(this.board.turn()==='b' && player !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        } catch(e) {
            console.log(e);
            return;
        }

        if(this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === 'w' ? "black" : "white",
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === 'w' ? "black" : "white",
            }));
            return;
        }
        
        console.log(move.to);
        this.player2.send(JSON.stringify({
            type: MOVE,
            payload: move,
            board: this.board.board()
        }));

        this.player1.send(JSON.stringify({
            type: MOVE,
            payload: move,
            board: this.board.board()
        }));
    }
}