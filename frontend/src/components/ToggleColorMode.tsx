import { Button, useColorMode } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ToggleColorMode = ()=> {
    const { colorMode , toggleColorMode } = useColorMode()
    return(
        <Button onClick={() => toggleColorMode()} top='0' position={"absolute"} right={"0"} m={"1rem"}  >
        {
            colorMode === 'dark' ? <SunIcon /> : <MoonIcon />
        }
        </Button>
    )
}

export default ToggleColorMode