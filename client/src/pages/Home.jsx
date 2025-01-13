import { useEffect, useState } from "react";
// import { useContext } from "react";
// import { SocketContext } from "../context/SocketContext";
import { useCallback  } from "react";
import { useSocket } from "../context/SocketContext";
import {useNavigate} from "react-router-dom"


function Home() {

const {socket} = useSocket();

const navigate = useNavigate();



const[emailId , setemailId] = useState(null);
const[roomId , setroomId] = useState(null);


const handlUserJoinRoom = useCallback(()=>{

  console.log("data : " , emailId , roomId , socket);

  socket.emit("join" , { emailId , roomId});


} , [emailId, roomId, socket ]);



const handleNewJoinRoom =({roomId}) =>{
    navigate(`/room/${roomId}`);

  }

useEffect(()=>{

  socket.on("joined-room" , handleNewJoinRoom);

  return () =>{
    socket.off("joined-room" , handleNewJoinRoom);

  }

},[socket]);



  return (
    <div>
          <div className='conatiner'>
        <div className='box'>
          <h1>React Video Chat App</h1>
          <input  onChange={(e)=>setemailId(e.target.value)} type="text"  placeholder='Enter a Eamil' />
          <input  onChange={(e)=> setroomId(e.target.value)} type="text" placeholder='enter romm id' />
          <button onClick={()=>handlUserJoinRoom()}>Connect</button>
        </div>
        
      </div> 
    </div>
  )
}



export default Home;
