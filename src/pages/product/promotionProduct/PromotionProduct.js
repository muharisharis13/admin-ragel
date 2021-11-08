import React, { useState, useEffect, useContext } from 'react'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import { Button } from '../../../component/element/Button'
import DatePicker from 'react-datepicker'
import { Context } from '../../../service/context/Context'

export const PromotionProduct = (props) => {
  const p = props.location.state
  const [data, setData] = useState({
    promotion_name: '',
    promotion: '',
    promotion_desc: '',
    start: new Date(),
    end: new Date()
  })

  const { apiproduk } = useContext(Context)


  const onChangeValue = ({ e, type }) => {
    switch (type) {
      case 'promotion_name':
        setData({ ...data, promotion_name: e.target.value })
        break;
      case 'promotion':
        setData({ ...data, promotion: e.target.value })
        break;
      case 'promotion_desc':
        setData({ ...data, promotion_desc: e.target.value })
        break;


      default:
        // alert('Check onChange Input')
        break;
    }
  }

  const btnAddPromotion = () => {
    apiproduk({ type: 'POST_ADD_PROMOTION', data: {
      promotion_description: data.promotion_desc,
      promotion_end:data.end,
      promotion_start:data.start,
      promotion_name:data.promotion_name,
      promotion_percentage: data.promotion,
      product_id : p.id
    } })
  }


  return (
    <Container bgColor="#F1F3F9" className="container-fluid">
  
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Total Product
        </div>
      </div>

      <div className="container-fluid">
        <Container2 className="row mt-5 ">
          <div className="col-md-12 col-sm-12" >
            <div className="row">
              <div className="col-md-12 col-sm-12" style={{ fontWeight: 700 }}>
                Product Promotion
              </div>
            </div>

            <div className="row">
              <div className=" col-lg-6 col-md-6 col-sm-12 mt-2">
                <div className="row justify-content-center align-items-center">
                  <WrapperProduct className="col-lg-7 col-md-12 col-sm-12 mt-4">
                    <WrapperImage>
                      <ImgProduct src={p.product_pic_url} alt="image" />
                    </WrapperImage>
                    <ContainerProduct>
                      <TitleProduct>
                        {p.product_name}
                      </TitleProduct>
                      <Content>
                        {p.product_description}
                      </Content>
                      <Price>
                        Rp. {p.selling_price}
                      </Price>
                    </ContainerProduct>
                  </WrapperProduct>

                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                <div className="row mt-1">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    Start Date <br />
                    <DatePicker selected={data.start} onChange={(e) => setData({ ...data, start: e })} dateFormat="dd-MMM-yyyy" className="form-control" />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    End Date <br />
                    <DatePicker selected={data.end} onChange={(e) => setData({ ...data, end: e })} dateFormat="dd-MMM-yyyy" className="form-control" />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="promotion name"> promotion name</label>
                    <input id="promotion name" type="text" placeholder="promotion name" className="form-control" value={data.promotion_name} onChange={(e) => onChangeValue({ e: e, type: 'promotion_name' })} />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div>
                      <label htmlFor="promotion %"> promotion %</label>
                      <input id="promotion %" type="number" placeholder="promotion %" className="form-control" value={data.promotion} onChange={(e) => onChangeValue({ e: e, type: 'promotion' })} />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="desc">Promotion Description</label>
                    <textarea style={{ resize: 'none' }} cols={10} rows={5} id="desc" type="text" placeholder="Product Description" className="form-control"
                      value={data.promotion_desc} onChange={(e) => onChangeValue({ e: e, type: 'promotion_desc' })}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 mt-2 align-items-center justify-content-center">
                    <input type="checkbox" id="apply" /> &nbsp;
                    <label htmlFor="apply">Apply prmotion to similiar category</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center text-center mt-5">
            <WrapperButton className="col-lg-4 col-md-12 col-sm-12">
              <Button onClick={btnAddPromotion}>Publish Promotion</Button>
            </WrapperButton>
          </div>
        </Container2>
      </div>
    </Container>
  )
}

const WrapperImage = styled.div`
position:relative;
`



const Price = styled.div`
font-weight: 800;
font-size:20pt;
`

const Content = styled.div`
color: #172B4D;
font-weight:normal;
padding:5px 0px;
word-wrap: break-word
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
height:200px;
border-radius: 10px 10px 0px 0px;
object-fit: cover;
`


const WrapperButton = styled.div`
padding-bottom: 20px;
@media only screen and (min-width:320px) and (max-width : 425px){
  margin-left: 8%;
}
`


const Container2 = styled.div`
background:#fff;
border-radius:10px;
padding:10px 10px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
`

