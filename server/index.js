import  express from "express"
// import http from "http"
import {Server} from "socket.io"
import bodyParser from "body-parser";
import cors from "cors"


const app = express();
const port = 8000;
// const server = http.createServer(app); no need karn io diretly anothe port vr on krnare
const io = new Server({
    cors : true,
});



//conf
app.use(bodyParser.json());
app.use(express.urlencoded())
app.use(express.json());
app.use(cors());

const emailToSockemap = new Map();
const socketToEmailMap = new Map();

io.on('connection' , socket =>{
    console.log("user conneted  :" , socket.id);

    io.emit("hello" , "welcome to websocket!");

    //join event
    socket.on('join' , (data)=>{
        const{emailId , roomId} = data;

        console.log("emailId  :" , emailId , "rooomID :" , roomId);

        //update in map //stor current email and socket id
        emailToSockemap.set(emailId,socket.id);
        socketToEmailMap.set(socket.id , emailId);




        //joined room
        socket.emit("joined-room" , {roomId});//send message to all joined room

        //create room
        socket.join(roomId);
        //send only in room new user join room
        socket.broadcast.to(roomId).emit("user-joined" , {emailId ,roomId});

        //call -user event 

        socket.on("call-user" , (data)=>{
            const {emailId , offer} = data;
            //find socket id based on email
            const socketid = emailToSockemap.get(emailId);

            const formemail = socketToEmailMap.get(socket.id);

            socket.to(socketid).emit("calling-user" , {formemail , offer});
        })


        //call-accpeted event 
        socket.on("call-accpeted" , async(data)=>{
            const{answer , formemail} = data;

         const socketid = emailToSockemap.get(formemail);
          
         socket.to(socketid).emit("call-accpeted" , {answer});
        })


    });




    socket.on('disconnect' , ()=>{
        console.log("user is disconnect :" , socket.id);
    })


})


app.get('/', (req, res) => {
    res.send('Hello World!');
});


//8000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//8001
io.listen(8001);