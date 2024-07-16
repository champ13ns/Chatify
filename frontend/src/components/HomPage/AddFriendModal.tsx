import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import CustomForm from '../../CustomForm'
import * as Yup from 'yup'

const AddFriendModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} isCentered >
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
          alert(JSON.stringify(values));
          actions.resetForm();
          onClose();
        }}  >
          <Form>
            <ModalBody  >
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