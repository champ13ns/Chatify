import { Socket, io } from "socket.io-client";

const socket : Socket = io('http://localhost:4000',  {
    autoConnect : false,
    withCredentials : true,
    extraHeaders : {
        authorization : localStorage.getItem('token') || ''        
    }
})

export {socket}