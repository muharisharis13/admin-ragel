import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import imgexmp from '../../../image/gettyimages-1129716834.png'
import { FaPencilAlt, FaPercent, FaTrash } from 'react-icons/fa'
import { LinkButton } from '../../../component/element/Button'
import { Context } from '../../../service/context/Context'
import { methodGET } from '../../../service/method/method'
import { currency } from '../../../utl/Currency'

export const ListPromotionProduct = () => {
  const { dispatch } = useContext(Context)
  const [data, setData] = useState([])
  const [max_page, setMax_page] = useState(0)
  const loading = (props) => dispatch({ type: "LOADING", loading: props })

  useEffect(() => {
    loading(true)
    methodGET({ endpoint: `/product/promo/1` })
      .then(res => {
        console.log(res)
        if (res.success) {
          setData(res.success.data)
          setMax_page(res.success.max_page)
        }
        loading(false)
      })
  }, [])


  const options = [
    { value: 'brush', label: 'brush' }
  ]

  // console.log(arrProdukPromosi)

  return (
    <Container data-aos="fade-down" bgColor="#F1F3F9" className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Promotion List
        </div>
      </div>

      <div className="row justify-content-start mt-2 align-items-baseline">
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
            <h3>{data.length}</h3> &nbsp; <Items>Items</Items>
          </Wrapper>
        </div>
      </div>

      <div className="container">

        <div className="row">
          {
            data.length > 0 ? data.map((item, index) => (
              <WrapperProduct className="col-lg-3 col-md-12 col-sm-12 mt-4" key={index}>
                <div >
                  <ImgProduct src={item.product_pic_url} alt={item.product_pic_url.slice(0, 19)} />
                </div>
                <div className="container">
                  <TitleProduct>
                    {item.product_name}
                  </TitleProduct>
                  <Content>
                    {item.product_description.slice(0, 50)}
                  </Content>
                  <Price>
                    {currency(item.selling_price)}
                  </Price>

                  <small>
                    Category : {item.product_category}
                  </small>

                </div>
                <WrapperButton>
                  <ButtonProduct>
                    <FaTrash />
                  </ButtonProduct>
                </WrapperButton>
              </WrapperProduct>

            ))
              : <h5 style={{ height: '100vh' }}>nothing data</h5>
          }

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
position:absolute;
bottom:5%;
`

const Price = styled.div`
font-weight: 800;
font-size:15pt;
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
background-color: red;
height:100%;
`

const WrapperProduct = styled.div`
background:#fff;
border-radius: 10px;
padding:0px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
flex-wrap: wrap;
margin:0px 10px;
position:relative;
height:470px;
`

const ImgProduct = styled.img`
width:100%;
border-radius: 10px 10px 0px 0px;
object-fit: cover;
height:250px;
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
