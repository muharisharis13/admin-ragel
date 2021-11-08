import React, { useEffect, useContext, useState } from 'react'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import { Pagination } from '../../../component/pagination/Pagination'
import { Context } from '../../../service/context/Context'
import { methodGET } from '../../../service/method/method'
import { currency } from '../../../utl/Currency'

export const TotalProductSoldThisMonth = ({ length = '488' }) => {
  const { dispatch } = useContext(Context)
  const [data, setData] = useState([])
  const loading = (props) => dispatch({ type: "LOADING", loading: props })


  useEffect(() => {
    loading(true)
    methodGET({ endpoint: "/product/soldAll/1" })
      .then(res => {
        console.log(res)
        if (res.success) {
          setData(res.success)
        }
        loading(false)
      })
  }, [])

  return (
    <Container data-aos="fade-down" bgColor="#F1F3F9" className="container-fluid" style={{ height: '100vh' }}>
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Total Product Sold
        </div>
      </div>

      <Container2 className="container mt-4">
        <Title>
          <h5>Product Sold This Month: {data.length} </h5>
        </Title>

        <Table>
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Selling Price</Th>
              <Th>Quantity SOLD</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.length > 0 ?
                data.map((item, index) => (
                  <tr key={index}>
                    <th style={{ padding: '15px 0px', paddingLeft: "30px", textAlign: "left" }}>{item.product_name}</th>
                    <td>
                      {currency(item.selling_price)}
                    </td>
                    <td>
                      {item.sold}
                    </td>
                    <td>
                      {currency(parseInt(item.selling_price) * parseInt(item.sold))}
                    </td>
                  </tr>

                ))
                :
                <tr>
                  <th style={{ padding: '15px 0px' }}>Nothing Data</th>
                  <th style={{ padding: '15px 0px' }}>Nothing Data</th>
                  <th style={{ padding: '15px 0px' }}>Nothing Data</th>
                  <th style={{ padding: '15px 0px' }}>Nothing Data</th>
                </tr>

            }
          </Tbody>
        </Table>

        <div className="row mt-5 justify-content-end align-items-end" >
          {/* <div className="col-md-12" style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination />
          </div> */}
        </div>
      </Container2>
    </Container>
  )
}

const Title = styled.div`
padding:0px 20px;
font-weight:600;
`

const WrapperCat = styled.div`
display:flex;
align-items: center; 
justify-content: center;
`

const Dot = styled.div`
width:10px;
height:10px;
background:red;
border-radius: 100%;
`

const Tbody = styled.tbody`
text-align:center;
`

const Th = styled.th`
padding:10px 0px;
text-transform : uppercase;
`

const Tr = styled.tr`
border : none !important;
`

const Table = styled.table`
border : none !important ;
width:100%;
margin-top:20px;

`

const Thead = styled.thead`
text-align:center;
border : none;
background:#F1F3F9;
color: #8898AA;
`

const Container2 = styled.div`
background:#fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:7px;
padding:20px 0px;
`
