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

export const Finish = () => {
  const { dispatch } = useContext(Context)
  const [modalseedetail, setModalSeedetail] = useState(false)
  const [index, setIndex] = useState(0)
  const [array, setArray] = useState([])
  const [max_page, setMax_page] = useState(0)
  const loading = (props) => dispatch({ type: "LOADING", loading: props })

  const btnSeeDetail = (index) => {
    setModalSeedetail(true)
    setIndex(index)
  }

  const bntHideModal = () => setModalSeedetail(false)


  useEffect(() => {
    loading(true)
    methodPost({
      endpoint: `/order/listAll?page=1`, data: {
        command: "finished"
      }
    })
      .then(res => {
        console.log({ finish: res.success })
        if (res.success) {
          setArray(res.success.data)
          setMax_page(res.success.max_page)
        }
        loading(false)
      })
  }, [])

  const btnPagination = (page) => {
    loading(true)
    methodPost({
      endpoint: `/order/listAll?page=${page}`, data: {
        command: "finished"
      }
    })
      .then(res => {
        console.log({ finish: res.success })
        if (res.success) {
          setArray(res.success.data)
          setMax_page(res.success.max_page)
        }
        loading(false)
      })
  }

  return (
    <Container>
      {/* <div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            New Orders : {'18'}
          </div>
        </div>

      </div> */}

      <div className="row mt-5">
        <div className="col-md-12 col-sm-12">
          <Table className="table" responsive="xl" striped style={{ borderBottomWidth: 'none !important' }}>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>MEMBERS NAME</th>
                <th>ORDER DATE & TIME</th>
                <th>ORDER NUMBER</th>
                <th>ORDER DETAILS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <OrderDetailsTakeOffice show={modalseedetail} onhide={() => bntHideModal(index)} dataModal={array[index] ? array[index] : []} />
            <tbody style={{ textAlign: 'center' }}>
              {
                array.map((item, index) => (
                  <tr key={index}>
                    <td>{item.receiver_name}</td>
                    <td>{moment(item.created_at).format('ddd, DD MMMM YYYY')}</td>
                    <td>{item.no_invoice}</td>
                    <td>
                      <Button onClick={() => btnSeeDetail(index)}>See Details</Button>
                    </td>
                    <td>
                      <ContainerButton>
                        <Ship>{item.status}</Ship>
                      </ContainerButton>
                    </td>
                  </tr>

                ))
              }
            </tbody>
          </Table>
        </div>
      </div>

      <div className="row mt-4 justify-content-end align-items-end text-end">
        <div className="col-md-5 col-sm-12">
          <Pagination totalPage={max_page} btnPage={(select) => btnPagination(select)} />
        </div>
      </div>
    </Container>
  )
}

const Ship = styled.div`
cursor:pointer;
color:#000;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
text-transform: uppercase;
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
