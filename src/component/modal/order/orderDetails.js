import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

export const OrderDetails = ({ show, onhide, dataModal }) => {
  const data = dataModal !== undefined ? dataModal : {}


  // console.log('ini data Modal : ',data)
  return (
    <Modal size='lg' show={show} onHide={()=>onhide(0)}>
      <Modal.Header>
        <FaTimes onClick={()=>onhide(0)} />
      </Modal.Header>
      <Modal.Body>
        <div className="container">


          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div>
                payment by : {data.method_peyment}
              </div>
            </div>
            <div className="col-md-4 col-sm-12"></div>
            <div className="col-md-4 col-sm-12">
              <div style={{textTransform:'uppercase'}}>
                Status : {data.status}
              </div>
            </div>
          </div>

          <div className="row align-items-center justify-content-center mt-3">
            <div className="col-md-12 col-sm-12">
              <div>Shipping By : {data.shipping_name}
              </div>
              {/* <div>Shipping By : <img src="https://1.bp.blogspot.com/-jV9NSilzZuQ/WcDMH2zTC9I/AAAAAAAAAaQ/B1qXHKjE1s8tvEiYZ4KSr7bbQ6zconmXgCLcBGAs/w1200-h630-p-k-no-nu/logo_j%2526t.png" alt="logo" width={100} />
                &nbsp;Regular (2 - 3 days)
              </div> */}
            </div>

            <div className="col-md-12 col-sm-12 mt-2">
              Ship To : {data.shipping_to}
            </div>
          </div>

          <div className="row mt-5 justify-content-center align-items-center text-center">
            <div className="col-md-2 col-sm-12">
              {`${data.order_detail !== undefined ? data.order_detail.length : 0} items`}
            </div>
            <div className="col-md-10 col-sm-12">
              ORDER NUMBER : {data.id_order}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12 col-sm-12">
              <Table striped responsive>
                <thead style={{ textAlign: 'center' }}>
                  <tr>
                    <th>PRODUCT NAME</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                {
                  data.order_detail !== undefined ? data.order_detail.map((item, index)=>(
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                    <td>{item.total}</td>
                  </tr>

                  )) : 
                  'undefined'
                }
                </tbody>
              </Table>
            </div>
            <GrandTotal className="col-md-12 col-sm-12 text-end" style={{ display: 'inline-flex' }} >
              <Text>Grand Total</Text>
              <Angka>{data.total}</Angka>
            </GrandTotal>
          </div>

          <div className="row mt-3">
            <div className="col-md-12 col-sm-12">
              <img src={data.bukti_transfer} alt="bukti tf" width={200} />
            </div>
          </div>

        </div>
      </Modal.Body>
    </Modal >
  )
}

const Text = styled.div`
padding:0px 5px;
font-weight:700;
`

const Angka = styled.div`
padding:0px 5px;
`

const GrandTotal = styled.div`
text-align: right;
width:100%;
align-items: flex-end;
justify-content: flex-end;
`
