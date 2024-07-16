import { Button, useColorMode } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ToggleColorMode = ()=> {
    const { colorMode , toggleColorMode } = useColorMode()
    return(
        <Button onClick={() => toggleColorMode()} className="absolute m:1 top-0 right-0"  >
        {
            colorMode === 'dark' ? <SunIcon /> : <MoonIcon />
        }
        </Button>
    )
}

export default ToggleColorMode