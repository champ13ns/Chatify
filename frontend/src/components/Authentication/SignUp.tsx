import { VStack, Heading, ButtonGroup, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomForm from '../../CustomForm'; ``
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ username: "", password: "", firstName: "", email: "", lastName: "" }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required("Username required!")
                    .min(6, "Username too short!")
                    .max(28, "Username too long!"),
                password: Yup.string()
                    .required("Password required!")
                    .min(6, "Password too short!")
                    .max(28, "Password too long!"),
                email: Yup.string().email()
                    .required("Email is required!")
                    .max(28, "Email too long!"),
                firstName: Yup.string()
                    .required("FirstName is required!")
                    .min(3, "FirstName too short")
                    .max(28, "FirstName too long!"),
                lastName: Yup.string()
                    .min(3, "LastName too short")
                    .max(28, "LastName too long!"),

            })}
            onSubmit={(values, actions) => {
                console.log("values are ,", values)
                console.log("actions are ,", actions)
                actions.resetForm();
                fetch('http://localhost:4000/api/v1/auth/signup', {
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
                <Heading>Sign Up</Heading>

                <CustomForm name="username"
                    placeholder="Enter username"
                    label="Username"
                    type="name"
                />
                <CustomForm name="password"
                    placeholder="Enter Password"
                    label="Password"
                    type="password"
                />
                <CustomForm name="email"
                    placeholder="Enter Email"
                    label="Email"
                    type="email"
                />
                <CustomForm name="firstName"
                    placeholder="Enter Firstname"
                    label="FirstName"
                    type="text"
                />
                <CustomForm name="lastName"
                    placeholder="Enter Lastname"
                    label="LastName"
                    isRequired="false"
                    type="text"
                />
                <ButtonGroup className="mt-2">
                    <Button type='submit'
                        colorScheme="teal">Register</Button>
                    <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate('/login')} colorScheme="green" className='flex items-start space-x-8 '>
                        Login
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik >
    )
};

export default SignUp;


