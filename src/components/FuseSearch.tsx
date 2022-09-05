import { CSSObject, Input, InputProps, List, ListItem } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import React, { FC, useState } from 'react'

export interface FuseSearchProps extends InputProps {
  sketches: string[]
}

const FuseSearch: FC<FuseSearchProps> = ({ sketches }) => {
  const [value, setValue] = useState<string>('')
  const fuse = new Fuse(sketches, { includeScore: true })
  const filteredSketches = fuse.search(value)

  const focusStyles: CSSObject = {
    border: '2px solid',
    borderRadius: 8,
    borderColor: 'red.100',
    py: 1,
    px: 3,
  }

  return (
    <>
      <Input
        mb={4}
        borderColor='black'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <List>
        {value !== ''
          ? filteredSketches.map(({ item }, i) => {
              return (
                <ListItem key={item + i} fontSize='2xl'>
                  <Link href={`/sketches/${item}`} _focus={focusStyles}>
                    {item.replaceAll('-', ' ')}
                  </Link>
                </ListItem>
              )
            })
          : sketches.map((sketch, i) => {
              return (
                <ListItem key={sketch + i} fontSize='2xl'>
                  <Link href={`/sketches/${sketch}`} _focus={focusStyles}>
                    {sketch.replaceAll('-', ' ')}
                  </Link>
                </ListItem>
              )
            })}
      </List>
    </>
  )
}

export default FuseSearch
