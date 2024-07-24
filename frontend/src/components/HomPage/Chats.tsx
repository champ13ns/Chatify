import { Heading, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FriendContext } from './Home'

const Chats = () => {
  const { friendList } = useContext(FriendContext)
    return friendList.length > 0 ? (
      <VStack >
      <p>No friends yet</p>
        <TabPanels>
          <TabPanel>
            One
          </TabPanel>
          <TabPanel>
            Two
          </TabPanel><TabPanel>
            Three
          </TabPanel><TabPanel>
            Four
          </TabPanel>
        </TabPanels>
      </VStack>
    ) : (
      <div>
      <TabPanels>
        <TabPanel>
          <Heading  textAlign='center'>No Friends Yet :( Add Friends to start chatting!</Heading>
        </TabPanel>
      </TabPanels>
      </div>
    )
  }


export default Chats


