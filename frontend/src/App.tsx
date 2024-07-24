import Login from "./components/Authentication/Login"
import SignUp from "./components/Authentication/SignUp"
import  { Routes, Route } from 'react-router-dom'
import Home from "./components/HomPage/Home"
import ToggleColorMode from "./components/ToggleColorMode"
function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/home' element={<Home/>}  />
      <Route path='/register' element={<SignUp />} /> 
      <Route path="*" element={<Login />} />
    </Routes>
      <ToggleColorMode />
    </div>
  )
}

export default App
