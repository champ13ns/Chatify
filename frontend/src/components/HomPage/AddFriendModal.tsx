import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import {useCallback, useContext, useState} from 'react'
import CustomForm from '../../CustomForm'
import * as Yup from 'yup'
import { socket } from '../../socket'
import { FriendContext } from './Home'

const AddFriendModal = ({ isOpen, onClose } : {isOpen : any, onClose : any}) => {
  const [error , setError] = useState('')
  const { friendList, setFriendList } = useContext(FriendContext)
  const closeModal = 
    useCallback(() => {
      setError('');
      onClose();
    }, [onClose]) 

  return (
    <Modal isOpen={isOpen} isCentered onClose={closeModal} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <Formik initialValues={{ friendName: '' }} 
        validationSchema={
            Yup.object({
              friendName : Yup.string().required('Friend name is required').min(3,'Name too short').max(20,'Friend Name too long')
            })
        }
        onSubmit={(values, actions) => {
           socket.emit('add_friend',values.friendName, ({errorMessage , done ,data} : {errorMessage : string, done : boolean , data : any} ) => {
                if(done) {
                  setFriendList(data);
                  closeModal();
                  return;
                }  
                setError(errorMessage)
              } )
        }}  >
          <Form>
            <ModalBody  >
             { <Heading  textAlign='center' textColor={'red.500'}  >{error}</Heading>}
              <CustomForm label="Friend's name"
                isRequired='true'
                placeholder='Enter username' name='friendName' />
            </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' type='submit' >
              Submit
            </Button>
          </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default AddFriendModal