import { useContext } from "react";
import {createContext , useMemo} from "react"


export const PeerContext = createContext(null);

//create hook
// export const usePeer = () =>{
//     // eslint-disable-next-line no-empty-pattern
//     const {peer , createOffer } = useContext(PeerContext);
//     return{peer , createOffer } 
// }

export const usePeer = () => useContext(PeerContext);


export const PeerProvider = (props) =>{

    const peer = useMemo(()=> new RTCPeerConnection(
        {
            iceServers :[
                {
                    urls :[
                        'stun:stun.l.google.com:19302',
                        'stun:global.stun.twilio.com:3478'
                    ]
                }
            ]
        }
    ) , []) //rtc connection create

// 
// console.log("peer : " , peer);




    //create offer
    const createOffer = async() =>{
        const offer  = await peer.createOffer() //offer create 
        // console.log("my offer : " , offer);
        //set in my loacl dis
        await peer.setLocalDescription(offer);
        return offer;
    }

    //create answer

    const createAnswer = async(offer) =>{
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;

    }


    const setRemoteAns = (answer) =>{
        peer.setLocalDescription(answer);

    }



 return (
    
    <PeerContext.Provider value={{peer , createOffer ,createAnswer , setRemoteAns}}>
        {props.children}
    </PeerContext.Provider>
 )



}

