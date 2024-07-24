import { VStack, Heading, ButtonGroup, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomForm from '../../CustomForm'; ``
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ password: "", email: "" }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required("Username required!")
                    .min(6, "Username too short!")
                    .max(28, "Username too long!"),
                password: Yup.string()
                    .required("Password required!")
                    .min(6, "Password too short!")
                    .max(28, "Password too long!")

            })}
            onSubmit={(values, actions) => {
                console.log("values are ,", values)
                actions.resetForm();
                fetch('http://localhost:4000/api/v1/auth/login', {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((res) => {
                   if(res.status === 200) {
                      res.json().then((token) => {
                        localStorage.removeItem('token')
                        localStorage.setItem('token',`Bearer ${token}`)
                        navigate('/home')
                     })
                   }
                }).catch(err => console.log("err is ", err))
            }}
        >
            <VStack
                as={Form}
                className="w-1/2 m-auto flex flex-col items-center text-2xl h-screen justify-center"
            >
                <Heading>Log In</Heading>

                <CustomForm name="email"
                    placeholder="Enter email"
                    label="Email"
                    type="email"
                />
                <CustomForm name="password"
                    placeholder="Enter Password"
                    label="Password"
                    type="password"
                />
               
                <ButtonGroup className="mt-2">
                    <Button type='submit'
                        colorScheme="teal">Login</Button>
                    <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate('/login')} colorScheme="green" className='flex items-start space-x-8 '>
                        Register
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik >
    )
};

export default Login;


