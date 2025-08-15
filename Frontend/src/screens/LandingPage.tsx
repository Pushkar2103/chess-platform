import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { wsAtom } from "../states/websocketAtom";

function LandingPage() {
    const navigate = useNavigate();
    const setWsState = useSetRecoilState(wsAtom);
    return (
        <div className="flex justify-around pt-[8%]">
            <img src="image.png" alt="chess" height={'40%'} width={'40%'} className="shadow-[0_0_10px_3px_black] rounded-md" />
            <div className="flex flex-col justify-center items-center gap-6">
                <h2 className="text-white font-sans font-semibold text-5xl">Play Chess Online</h2>
                <button className="p-2 bg-slate-500 w-40 text-lg font-bold rounded-md hover:shadow-[0_0_15px_3px_rgba(150,150,150)] hover:text-green-100" 
                onClick={()=>{
                    const socket = new WebSocket('ws://localhost:8080');

                    socket.onopen = ()=> {
                        console.log("connecntion stablished");
                        socket.send(JSON.stringify({type:'init_game'}));
                        setWsState(socket);
                        navigate('/game')
                    };
                    socket.onerror = (error) => {
                        console.error("WebSocket error:", error);
                    };
                }}>Play Online</button>
            </div>
        </div>
    );
}

export default LandingPage;