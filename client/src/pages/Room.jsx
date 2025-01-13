import {  useCallback, useEffect } from "react"
import { useSocket } from "../context/SocketContext";
import { usePeer } from "../context/Peer";





function Room() {

  const {socket} = useSocket();
  const {peer , createOffer , createAnswer , setRemoteAns } = usePeer();


  const handleNewUserJoinRoom = useCallback(async(data) =>{
    const {emailId , roomId} = data;
    console.log("new user joined to room : " , emailId , roomId);
    const offer = await createOffer();
    //send offer
    socket.emit("call-user" , {emailId , offer} );

  },[createOffer, socket]);



  const handleIncomingCallUser = useCallback(async(data) =>{
    const {formemail , offer} = data;
    console.log("incoming call user and offer " , formemail , offer);


    //create ans and send 

    const answer = await createAnswer(offer);
    socket.emit("call-accpeted" , {answer , formemail })

  } , [createAnswer]);


  const handleCallAccecpted = useCallback(async(data)=>{

    const {answer} = data;

    console.log("call accepted ans  : " , answer);

    //set ans is remote
    await setRemoteAns(answer);



  },[])



  useEffect(()=>{

    socket.on("user-joined" , handleNewUserJoinRoom);
    socket.on("calling-user" , handleIncomingCallUser);
    socket.on("call-accpeted" , handleCallAccecpted);

   return () =>{

    socket.off("user-joined",  handleNewUserJoinRoom);
    socket.off("calling-user" , handleIncomingCallUser);
    socket.off("call-accpeted" , handleCallAccecpted);


   }

  },[socket])





  return (
    <div>room</div>
  )
}

export default Room