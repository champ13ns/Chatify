

import React, { useEffect, useContext } from 'react';
import { socket } from '../../socket';
import { FriendContext } from './Home';

const useSocket = ({ friendList, setFriendList }) => {
  const val = useContext(FriendContext);
  console.log('Friend Context is ', val);

  useEffect(() => {
    socket.connect();
    socket.emit('get_friendList');

    // Listener for friendList data
    

    return () => {
      socket.off('friendList');
      socket.off('online');
      socket.off('offline');
      socket.disconnect();
    };
  }, [setFriendList])

    socket.on('friendList', (data) => {
      console.log('data is ', data);
      setFriendList(data);

    });


    // Listener for online/offline event  
    socket.on('connected', (status, username) => {
      console.log('connected event data: ',username, status)
      setFriendList((prevList) =>
        prevList.map((friend) =>
          friend.username === username ? { ...friend, connected: status } : friend
        )
      );
      console.log('new FriendList is');
      console.log(friendList)
    });
  }

export default useSocket