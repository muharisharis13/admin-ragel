import moment from 'moment'
import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { currency } from '../../../utl/Currency'
import { Button } from '../../element/Button'

export const OrderDetailsTakeOffice = ({ show, onhide, dataModal }) => {
  const data = dataModal


  // console.log('ini data Modal2 : ', data)
  return (
    <Modal size='lg' show={show} onHide={() => onhide(0)}>
      <Modal.Header>
        <FaTimes onClick={() => onhide(0)} />
      </Modal.Header>
      <Modal.Body>
        <div className="container" style={{ padding: "10px 20px", paddingBottom: "50px" }}>


          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div>
                payment by : {data.pay_gate_name}
              </div>
            </div>
            <div className="col-md-4 col-sm-12"></div>
            <div className="col-md-4 col-sm-12">
              <div style={{ textTransform: 'uppercase' }}>
                Status : {data.status}
              </div>
            </div>
          </div>

          <div className="row align-items-center justify-content-center mt-3">
            <div className="col-md-12 col-sm-12">
              <div>Shipping By : {data.finished_by}
              </div>

            </div>

            {/* <div className="col-md-12 col-sm-12 mt-2">
              Order Taken (estimated) : {moment(new Date()).format('DD/MM/YYYY - HH.mm')}
            </div> */}
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <strong>User Details</strong>
              <table>
                <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>:{" "}{data.receiver_name}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>:{" "}{data.receiver_phone}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:{" "}{data.delivery_address}</td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <strong>Info Payment</strong>
              <table>
                <tbody>
                  <tr>
                    <td>Limit Payment</td>
                    <td>:{" "}{moment(data.limit_payment_time).format('dddd MMMM YYYY - hh:mm')}</td>
                  </tr>
                  <tr>
                    <td>Payment By</td>
                    <td>:{" "}{data.pay_gate_name}</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>:{" "}{data.to_account_name}</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>:{" "}{data.to_account_number}</td>
                  </tr>
                  <tr>
                    <td>Shipping Fee </td>
                    <td>:{" "}{currency(data.shipping_fee)}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12 col-sm-12">
              <strong>Bukti Pembayaran</strong> <br /><br />
              {
                data.proof_url !== "" ?
                  <ImgBuktiBayar src={data.proof_url} alt="bukti tf data nya enggak terbaca" width={200} height={200} />
                  : null
              }
            </div>
          </div>

          <div className="row mt-5 justify-content-center align-items-center text-center">
            <div className="col-md-2 col-sm-12">
              {`${data.order_details !== undefined ? data.order_details.length : 0} items`}
            </div>
            <div className="col-md-10 col-sm-12">
              ORDER NUMBER : {data.no_invoice}
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
                    data.order_details !== undefined ? data.order_details.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.qty}</td>
                        <td>{currency(item.selling_price)}</td>
                        <td>{currency(parseInt(item.qty) * parseInt(item.selling_price))}</td>
                      </tr>

                    )) :
                      'undefined'
                  }
                </tbody>
              </Table>
            </div>
            <GrandTotal className="col-md-12 col-sm-12 text-end" style={{ display: 'inline-flex' }} >
              <Text>Grand Total</Text>
              <Angka>{currency(data.total_amount)}</Angka>
            </GrandTotal>
          </div>



        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onhide(0)}>Back</Button>
      </Modal.Footer>
    </Modal >
  )
}


const ImgBuktiBayar = styled.img`
object-fit: contain;
width: 350px;
height: 350px;

`

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
