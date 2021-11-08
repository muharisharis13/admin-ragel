import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, LinkButton } from '../../../component/element/Button'

export const Cardproduct = ({ logo, title, angka = 0, small, display, name, link }) => {
  return (
    <Container className="row justify-content-center text-center align-items-center">
      <Right className="col-md-8">
        <Title>{title}</Title>
        {
          name &&
          <Name>{name}</Name>
        }
        <WrapperAngka>
          <Angka>{angka}</Angka>
          <Small>{small}</Small>
        </WrapperAngka>
      </Right>
      <Left className="col-md-4">
        <Image>
          <Img src={logo} alt="box rounded" width={40} />
        </Image>
        {
          display &&
          <div className="mt-4">
            <LinkButton to={link}>
              <Button>Check It !</Button>
            </LinkButton>
          </div>
        }
      </Left>
    </Container>
  )
}


const Img = styled.img`
@media only screen and (min-width : 320px) and (max-width:425px){
  width: 60px;
}
`

const Image = styled.div`
display:flex;
align-items: center;
justify-content: center;
`

const Name = styled.div`
font-weight: normal;
margin-top:10%;
`

const Small = styled.small`
font-size:8pt;
padding-left:5%;
font-weight: normal;
`

const Angka = styled.div`
font-size:16pt;
font-weight:700;
`


const WrapperAngka = styled.div`
display:flex;
align-items: center;
margin-top:5%;
`

const Title = styled.div`
font-weight: normal;
text-transform: uppercase;
font-size:11pt;
`

const Right = styled.div``
const Left = styled.div`
text-align:right;
height:100%;
`

const Container = styled.div`
background: #fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius: 7px;
padding:15px 0px;
display: flex;
align-items: center;
justify-content: center;
width:100%;
color:black;
text-align:center;
`
