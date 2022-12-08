import { io } from 'socket.io-client';
import { socketUrl } from 'utils/constants';

//const URL = 'https://crm.satudata.go.id/backend';
const socket = io(socketUrl, { autoConnect: false });

socket.onAny((event, ...args) => {
  //console.log(event, args);
});

export default socket;
