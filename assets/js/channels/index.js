import { Socket } from 'phoenix';

const createSocket = () => {
  const socket = new Socket('/socket');
  socket.connect();
  return socket;
}

const joinChannel = (socket, channelName, onJoin) => {
  const channel = socket.channel(channelName);
  if (channel.state !== 'joined') {
    channel.join()
     .receive('ignore', err => console.log(err))
     .receive('error', err => console.log(err))
     .receive('ok', () => {
       onJoin(channel);
     });
  }
}

const leaveChannel = (socket, channelName) => {
  let channel = socket.channel(channelName);
  channel.leave();
}

export { createSocket, joinChannel, leaveChannel };