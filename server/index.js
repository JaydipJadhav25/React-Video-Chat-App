import  express from "express"
import http from "http"
import {Server} from "socket.io"

const app = express();
const port = 8000;


const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});