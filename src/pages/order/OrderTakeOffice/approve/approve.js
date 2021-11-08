import React, { useState, useContext, useEffect } from 'react'
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

export const ApproveTakeAtOffice = () => {
  const { apiorder, arrOrder, max_pageOrder, dispatch } = useContext(Context)
  const [modalseedetail, setModalSeedetail] = useState(false)
  const [index, setIndex] = useState(0)
  const [data, setData] = useState([])
  const [max_page, setMax_page] = useState(0)
  const [page, setPage] = useState(0)
  const loading = (props) => dispatch({ type: "LOADING", loading: props })

  useEffect(() => {
    loading(true)
    methodPost({ endpoint: '/order/listAll?page=1', data: { command: "approved" } })
      .then(res => {
        console.log("approved", res)
        if (res.success) {
          setData(res.success.data)
          setMax_page(res.success.max_page)
          setPage(res.success.page)
        }
        loading(false)
      })
  }, [])

  const btnSeeDetail = (index, type) => {

    if (type === 'buka') {
      setModalSeedetail(true)
      setIndex(data[index])

    }
    else if (type === 'tutup') {
      setModalSeedetail(false)

    }
  }


  const btnPagination = (page1) => {
    loading(true)
    methodPost({ endpoint: `/order/listAll?page=${page1}`, data: { command: "approved" } })
      .then(res => {
        console.log("approved", res)
        if (res.success) {
          setData(res.success.data)
          setMax_page(res.success.max_page)
          setPage(res.success.page)
        }
        loading(false)
      })
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
          .then(async res => {
            console.log(res)
            // alert(`${res.success.message}`)
            await swal("SUCCESS", `${res.success.message}`, "success");
            window.location.reload()
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
            window.location.reload()
            loading(false)
          })
        break;

      default:
        break;
    }
  }

  return (
    <div className="p-2">

      <div className="row">
        <div className="col-md-12 col-sm-12">
          {/* New Orders : {data.length} */}
        </div>
      </div>

      <OrderDetailsTakeOffice show={modalseedetail} onhide={() => btnSeeDetail(index, "tutup")} dataModal={index} />

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
                {/* <th>ACTION</th> */}
              </tr>
            </thead>

            <tbody style={{ textAlign: 'center' }}>
              {
                data.length > 0 ? data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.member_id}</td>
                    <td>{item.created_at ? moment(item.created_at).format('ddd, DD MMMM YYYY') : item.created_at}</td>
                    <td>{item.order_id}</td>
                    <td style={{ textTransform: "uppercase" }}>{item.status}</td>
                    <td>
                      <Button onClick={() => btnSeeDetail(index, "buka")}>See Details</Button>
                    </td>
                    {/* <td>

                      <ContainerButton>
                        <Ship onClick={() => btnPaidAndReject('paid', item.order_id)}>PAID</Ship>
                        <Reject onClick={() => btnPaidAndReject('reject', item.order_id)}>REJECT</Reject>
                      </ContainerButton>
                    </td> */}
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
          <Pagination totalPage={max_page} btnPage={btnPagination} />
        </div>
      </div>
    </div>
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

