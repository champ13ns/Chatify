import { VStack, Heading, ButtonGroup, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomForm from '../../CustomForm';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required("Username required!")
                    .min(6, "Username too short!")
                    .max(28, "Username too long!"),
                password: Yup.string()
                    .required("Password required!")
                    .min(6, "Password too short!")
                    .max(28, "Password too long!"),
            })}
            onSubmit={(values, actions) => {
                console.log("values are ,", values)
                actions.resetForm();
                fetch('http://localhost:4000/api/v1/auth/login', {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then((res) => {
                    if (res.status !== 200) {
                        alert("Wrong EmailID/ password")
                        return;
                    } else if(res.status === 200) {
                        res.json().then((token) => {
                            localStorage.setItem('token', `Bearer ${token}`)
                            navigate('/home')
                        })
                    }
                })
            }}
        >
            <VStack
                as={Form}
                className="w-1/2 m-auto flex flex-col items-center text-2xl h-screen justify-center"
            >
                <Heading>Log In</Heading>

                <CustomForm name="Username"
                    placeholder="Enter username"
                    label="username"
                    type="name"
                />
                <CustomForm name="Password"
                    placeholder="Enter Password"
                    label="Password"
                    type="password"
                />
                <ButtonGroup className="mr-2">
                    <Button type='submit' colorScheme="teal">Login</Button>
                    <Button onClick={() => navigate('/register')} colorScheme="green">
                        <ArrowBackIcon className='mr-1' />
                        Create Account</Button>
                </ButtonGroup>
            </VStack>
        </Formik >
    )
};

export default LoginForm;
