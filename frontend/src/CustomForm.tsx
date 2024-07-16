import { FormControl, FormLabel, FormErrorMessage, 
 Input } from '@chakra-ui/react'
import { useField, Field } from 'formik'

const CustomForm = ({label, isRequired,  type , ...props} : {label : string}) => {
  const [field, meta] = useField(props)
  return (
    <FormControl isRequired={isRequired === undefined ? true : false } isInvalid={meta.touched && meta.error} >
          <FormLabel>{label}</FormLabel>
          <Input type={type} as={Field} {...field} />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomForm