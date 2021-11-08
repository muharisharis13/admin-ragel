import React from 'react'
import styled from 'styled-components'
import Icon from '../../../image/icon/😍.png'

export const CardSales = ({ angkaSales, name }) => {
  return (
    <Container>
      <div>
        <Title>Most Sold Product</Title>
        <Name>{name}</Name>
        <WrapperNumbeer>
          <Number>{angkaSales}</Number>
          <Small>items Sold</Small>
        </WrapperNumbeer>
      </div>
      <Icon2>
        <img src={Icon} alt="icon" />
      </Icon2>
    </Container>
  )
}

const Icon2 = styled.div`
display: flex;
align-items : center;
justify-content: center;
text-align: center;
`

const Small = styled.small`
font-size: 8pt;
font-weight: normal;
color:#8898AA;
margin-bottom: 0px;
display: flex;
`

const WrapperNumbeer = styled.div`
display:inline-flex;
justify-content: center;
align-items: center;
`

const Number = styled.div`
font-weight: 700;
font-size: 15pt;
padding-right:10px;
`

const Title = styled.div`
font-weight: normal;
color:#8898AA;
font-size:10pt;
text-transform :uppercase;
`

const Container = styled.div`
background: #fff;
width: 100%;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:7px;
padding:15px;
display: flex;
justify-content: space-around;
cursor: default;
`

const Name = styled.div`
font-size:11pt;
font-weight:500
`