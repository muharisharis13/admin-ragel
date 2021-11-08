import React from 'react'
import styled from 'styled-components'
import { LinkButton } from '../element/Button'

export const Card = ({ title, angka, percent, img="", textSince=true, path="" }) => {
  return (
    <Container>
      <Wrapper>
        <div >
          <Title>
            {title}
          </Title>
          <div>
            {angka}
          </div>
        </div>
        <Logo >
          <img src={img} alt="Logo" width={45} />
        </Logo>
      </Wrapper>
      <Wrapper2 since={textSince}>
        <Percent>{percent = '+3.48%'} </Percent> &nbsp; Since Last Month
      </Wrapper2>
      
      <Wrapper3>
      <LinkButton to={path}>
        <Button>
          See Details
        </Button>

      </LinkButton>
      </Wrapper3>
    </Container>
  )
}

const Button = styled.div`
font-weight:500;
font-size: 10pt;
padding:5px 10px;
border-radius: 7px;
border: 1px solid #FFBF00;
color:#7764E4;
justify-content: center;
align-items: center;
text-align: center;
cursor:pointer;
transition:850ms;

&:hover{
  background-color: #7764E4;
  border: 1px solid #7764E4;
  color: #fff;
}
`

const Wrapper3 = styled.div`

`

const Percent = styled.p`
color:green;
`

const Wrapper = styled.div`
display: inline-flex;
justify-content: space-between;
width: 100%;
`
const Wrapper2 = styled.div`
display: ${({since})=>(since ? 'inline-flex' : 'none')};
font-size: 9pt;
margin-top: 1.5%;
`

const Logo = styled.div`
display: inline-flex;
justify-content: center;
align-items: center;
`

const Title = styled.div`
font-weight:normal;
text-transform: uppercase;
font-size: 10pt;
padding:5px 0px
`

const Container = styled.div`
padding:10px 10px;
background-color: #fff;
display: inline-flex;
width: 100%;
align-items: center;
flex-direction: column;
border-radius: 7px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
`