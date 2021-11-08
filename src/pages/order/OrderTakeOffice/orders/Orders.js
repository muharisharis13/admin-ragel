import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { Table } from 'react-bootstrap'
import { Button } from '../../../../component/element/Button'
import { Pagination } from '../../../../component/pagination/Pagination'
import { Context } from '../../../../service/context/Context'
import { OrderDetails } from '../../../../component/modal/order/orderDetails'
import moment from 'moment'
import { OrderDetailsTakeOffice } from '../../../../component/modal/order/OrderDetailTakeOffice'
import { methodPost } from '../../../../service/method/method'
import swal from 'sweetalert';

export const Orders = () => {
  const { apiorder, arrOrder, max_pageOrder, dispatch } = useContext(Context)
  const [modalseedetail, setModalSeedetail] = useState(false)
  const [index, setIndex] = useState(0)
  const loading = (props) => dispatch({ type: "LOADING", loading: props })


  const btnSeeDetail = (index, type) => {

    if (type === 'buka') {
      setModalSeedetail(true)
      setIndex(arrOrder[index])

    }
    else if (type === 'tutup') {
      setModalSeedetail(false)

    }
  }




  useEffect(() => {
    apiorder({ type: 'GET_ORDER_LIST_ALL', data: { command: 'paid' } })
  }, [])



  const btnPagination = (page) => {
    apiorder({ type: 'GET_ORDER_LIST_ALL', page: page, data: { command: 'paid' } })

  }

  const btnPaidAndReject = (type, order_id) => {
    loading(true)
    switch (type) {
      case "paid":
        methodPost({
          endpoint: "/order/process", data: {
            command: "approve",
            order_id: order_id
          }
        })
          .then(res => {
            console.log(res)
            // alert(`${res.success}`)
            loading(false)
          })
        break;
      case "reject":
        methodPost({
          endpoint: "/order/process", data: {
            command: "reject",
            order_id: order_id
          }
        })
          .then(async res => {
            console.log(res)

            // alert(`${res.success.message}`)
            await swal("SUCCESS", `${res.success.message}`, "success");
            // window.location.reload()
            loading(false)
          })
        break;

      default:
        break;
    }
  }

  return (
    <Container>
      {/* Modal */}

      <OrderDetailsTakeOffice show={modalseedetail} onhide={() => btnSeeDetail(index, "tutup")} dataModal={index} />
      <div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            {/* New Orders : {arrOrder.length} */}
          </div>
        </div>

      </div>

      <div className="row mt-5">
        <div className="col-md-12 col-sm-12">
          <Table className="table" responsive="xl" striped style={{ borderBottomWidth: 'none !important' }}>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>MEMBERS NAME</th>
                <th>ORDER DATE & TIME</th>
                <th>ORDER NUMBER</th>
                <th>STATUS</th>
                <th>ORDER DETAILS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody style={{ textAlign: 'center' }}>
              {
                arrOrder.length > 0 ? arrOrder.map((item, index) => (
                  <tr key={index}>
                    <td>{item.member_id}</td>
                    <td>{item.created_at ? moment(item.created_at).format('ddd, DD MMMM YYYY') : item.created_at}</td>
                    <td>{item.order_id}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button onClick={() => btnSeeDetail(index, "buka")}>See Details</Button>
                    </td>
                    <td>
                      {
                        item.status === 'paid' ?
                          <ContainerButton>
                            <Ship onClick={() => btnPaidAndReject('paid', item.order_id)}>PAID</Ship>
                            <Reject onClick={() => btnPaidAndReject('reject', item.order_id)}>REJECT</Reject>
                          </ContainerButton>
                          : item.status === 'expired' ? <TextStatus color="#EF4747">Expired</TextStatus>
                            : null
                      }
                    </td>
                  </tr>

                ))
                  : 'nothing data'
              }
            </tbody>
          </Table>
        </div>
      </div>

      <div className="row mt-4 justify-content-end align-items-end text-end">
        <div className="col-md-5 col-sm-12">
          <Pagination totalPage={max_pageOrder} btnPage={btnPagination} />
        </div>
      </div>
    </Container>
  )
}

const TextStatus = styled.div`
color : ${({ color }) => (color ? `${color}` : '#0000')}
`

const Ship = styled.div`
cursor:pointer;
color:#fff;
background:#FFBF00;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
`
const Reject = styled.div`
cursor:pointer;
color:#fff;
background:#EF4747;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
`

const ContainerButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
`

const Container = styled.div`
padding:20px 20px
`
