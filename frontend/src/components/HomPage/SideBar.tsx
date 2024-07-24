import { ChatIcon } from '@chakra-ui/icons'
import { Button, Text, Divider, HStack, Heading, Tab, TabList, 
VStack, Circle, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FriendContext } from './Home'
import AddFriendModal from './AddFriendModal'

export const SideBar = () => {

    const { isOpen, onOpen,onClose } = useDisclosure();

    const val = useContext(FriendContext)
    const {friendList, setFriendList} = val;
    return (
        <>
        <VStack mt={"1rem"}  >
            <HStack justifyContent='space-between' >
                <Heading size={"md"} >
                    Add Friend
                </Heading>
                <Button onClick={ onOpen } >
                    <ChatIcon />
                </Button>
            </HStack>
            <Divider />
            <VStack as={TabList} >
                {
                    friendList.map((friend)   => (
                        <HStack key={friend.username} as={Tab}  > 
                            <Circle bg={friend?.connected === true ? "green.700" : "red.600"} w="20px" h="20px" />
                            <HStack display='block' >
                            <Text size='xl' >{friend?.name}</Text>
                            <Text size='lg' textColor="lightgray" >@{friend?.username}</Text>
                            </HStack>
                        </HStack>
                    ))
                }
            </VStack>
        </VStack>
        <AddFriendModal isOpen = {isOpen} onClose = {onClose} />
        </>
    )
}
