import React, { createContext, useState, useEffect } from 'react'
import { Grid, GridItem, TabList, Tabs, } from '@chakra-ui/react'
import { SideBar } from './SideBar'
import Chats from './Chats'
import useSocket from './useSocket'

export const FriendContext = createContext('')

const Home = () => {
  const [friendList, setFriendList] = useState([])
  const [token, setToken] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')?.split(' ')[1];
    setToken(token || "");
  },[])
  useSocket({friendList, setFriendList});


  return (
    <FriendContext.Provider value={{ friendList, setFriendList, token }} >
      <Grid templateColumns="repeat(10,1fr)" h="100vh" as={Tabs} >
        <GridItem colSpan={2} height={"100vh"} >
          <SideBar />
        </GridItem>
        <GridItem colSpan={8} height={"100vh"}  >
          <Chats />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  )
}

export default Home