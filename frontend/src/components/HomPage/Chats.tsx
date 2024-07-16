import { Heading, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FriendContext } from './Home'

const Chats = () => {
  const { friendList } = useContext(FriendContext)
  {
    friendList.length > 0 ? (
      <VStack >
        <TabPanels>
          <TabPanel>
            One
          </TabPanel>
        </TabPanels>
      </VStack>
    ) : (
      <Heading textAlign='center'>Add Friends to start chatting!</Heading>
    )
  }
}

export default Chats