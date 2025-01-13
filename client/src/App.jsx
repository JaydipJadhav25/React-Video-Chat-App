import './App.css'

import { Route, Routes} from "react-router-dom"
import Home from './pages/home'
import Room from './pages/room'
import { SocketProvider } from './context/SocketContext'
import { PeerProvider } from './context/Peer'

function App() {





  return (
    <>
   <div>
    <PeerProvider>
<SocketProvider>
<Routes>
   <Route  path='/' element={<Home/>} />
   <Route  path='/room/:roomid' element={<Room/>} />
</Routes>
</SocketProvider>
    </PeerProvider>
   </div>
    </>
  )
}

export default App
