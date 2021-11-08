import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const Container1 = ({ children }) => {
  const [play, setPlay] = useState(false)

  useEffect(async () => {
    await setPlay(true)
  }, [])


  return (
    <Wrapper aniamtion={play}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
transition: 100ms;
opacity: ${({ aniamtion }) => (aniamtion ? 1 : 0)};
`


