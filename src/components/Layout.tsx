import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { FC, ReactElement } from 'react'

export interface LayoutProps {
  children?: ReactElement
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Xandy's p5 playground</title>
        <link rel="icon" type="image/icon" href="/favicon.svg" />
      </Head>
      <Box position="relative" overflow="hidden">
        <Box
          position="absolute"
          boxSize="20vw"
          bottom={0}
          right={0}
          transform="translate(5vw, 4vw)"
          backgroundImage="/asterisk.svg"
          backgroundRepeat="no-repeat"
          objectFit="contain"
          zIndex="hide"
        />
        <Flex as="main" direction="column" minH="100vh">
          {children}
        </Flex>
      </Box>
    </>
  )
}

export default Layout
