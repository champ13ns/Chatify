import React, { createContext, useState } from 'react'
import { Grid, GridItem, TabList, Tabs, } from '@chakra-ui/react'
import { SideBar } from './SideBar'
import Chats from './Chats'
export const FriendContext = createContext('')

const Home = () => {
  const [friendList, setFriendList] = useState([{
    username : "Sachin Fuloria",
    connected : false
  }, {
    username : "Test User",
    connected : true
  }])
  return (
    <FriendContext.Provider value={{friendList, setFriendList}} >
      <Grid templateColumns="repeat(10,1fr)" h="100vh" >
        <GridItem colSpan={3} height={"100vh"} as={Tabs} >
          <SideBar />
        </GridItem>
        <GridItem colSpan={7} height={"100vh"}  ></GridItem>
        <Chats />
      </Grid>
    </FriendContext.Provider>
  )
}

export default Home