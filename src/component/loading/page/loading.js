import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import lottie from 'lottie-web'



export const LoadingPage = () => {
  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../config/dataAnimation/690-loading (1).json'),
      rendererSettings: {
        clearCanvas: true,
        hideOnTransparent: false
      }
    })
  }, [])


  return (
    <Container>
      <div ref={container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '150px', height: '150px', top: '0%', left: '0%', background: 'transparent' }}>
      </div>
      Loading . . .
    </Container>
  )
}

const Container = styled.div`
position:fixed;
top:0;
right:0;
background:rgba(59, 74, 62, 0.30);
height:100vh;
width:100vw;
color:#000;
font-size:15px;
z-index:999;
display:flex;
flex-direction: column;
align-items:center;
text-align:center;
justify-content: center;
background-repeat: no-repeat;
`
