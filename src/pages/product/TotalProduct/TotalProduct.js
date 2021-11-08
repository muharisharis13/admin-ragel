import React from 'react'
import Select from 'react-select'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import imgexmp from '../../../image/gettyimages-1129716834.png'
import { FaPencilAlt, FaPercent, FaTrash } from 'react-icons/fa'
import { LinkButton } from '../../../component/element/Button'

export const TotalProduct1 = () => {




  const options = [
    { value: 'brush', label: 'brush' }
  ]

  return (
    <Container bgColor="#F1F3F9" className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Total Product
        </div>
      </div>

      <div className="row justify-content-start text-center mt-2 align-items-center">
        <div className="col-lg-1 col-md-12 col-sm-12">
          <Title>
            Category
          </Title>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <Select
            options={options}
            placeholder="Select Category"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Wrapper>
            <h3>3</h3> &nbsp; <Items>Items</Items>
          </Wrapper>
        </div>
      </div>

      <div className="container">

        <div className="row justify-content-center align-items-center">
          <WrapperProduct className="col-lg-3 col-md-12 col-sm-12 mt-4">
            <div>
              <ImgProduct src={imgexmp} alt="image" />
            </div>
            <ContainerProduct>
              <TitleProduct>
                Oriflame Brush
              </TitleProduct>
              <Content>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt animi amet et impedit ad voluptatem illo consequatur magnam cumque non?
              </Content>
              <Price>
                Rp. 88,000
              </Price>
              <WrapperButton>
                <LinkButton color="#000" to="/products/PromotionsProduct">
                  <ButtonProduct>
                    <FaPercent />
                  </ButtonProduct>
                </LinkButton>
                <LinkButton color="#000" to="/products/EditProduct">
                  <ButtonProduct>
                    <FaPencilAlt />
                  </ButtonProduct>
                </LinkButton>
                <ButtonProduct>
                  <FaTrash />
                </ButtonProduct>
              </WrapperButton>

            </ContainerProduct>
          </WrapperProduct>

        </div>
      </div>
    </Container>
  )
}

const ButtonProduct = styled.div`
padding:0px 10px;
font-weight: 900;
font-size: 14pt;
cursor:pointer;
display:flex;
align-items: center;
justify-content: center;
text-align:center;
`

const WrapperButton = styled.div`
display: inline-flex;
align-items: flex-end;
justify-content: flex-end;
text-align:right;
width: 100%;
`

const Price = styled.div`
font-weight: 800;
font-size:20pt;
`

const Content = styled.div`
color: #172B4D;
font-weight:normal;
padding:5px 0px;
`

const TitleProduct = styled.div`
font-weight:700;
font-size: 14pt;
text-align: center;
`

const ContainerProduct = styled.div`
padding:15px 20px;
`

const WrapperProduct = styled.div`
background:#fff;
border-radius: 10px;
padding:0px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
margin:0px 40px
`

const ImgProduct = styled.img`
width:100%;
border-radius: 10px 10px 0px 0px;
object-fit: cover;
`

const Items = styled.span`
color:#5E4E4E;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
font-weight : 700;
`

const Title = styled.div`
font-weight:700;

`
