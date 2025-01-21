import { Heading } from '@chakra-ui/react'
import { Demo } from './Demo'
import { Image } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"

function App() {
  return (
    <>
      <Flex gap="2" align="center" py="2" px="4">
        <Image src="/favicon/android-chrome-192x192.png" height="6" />
        <Heading >Hevy Converter</Heading>
      </Flex>
      <Demo />
    </>
  )
}

export default App
