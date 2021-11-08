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

export const Rejected = () => {
  const [max_page, setMax_page] = useState(0)
  const [modalseedetail, setModalSeedetail] = useState(false)
  const [index, setIndex] = useState({})
  const [array, setArray] = useState([
    {
      member_name: 'muharis',
      created_at: new Date(),
      id_order: '129123123',
      method_peyment: 'Bank Tranfer',
      shipping_to: 'Jalan Jambi No.22A, Medan Kota, SUMUT, 22222',
      shipping_name: 'Take A Office',
      total: '60000',
      bukti_transfer: 'https://sinergywarriorteam.com/wp-content/uploads/IMG_20190601_204613_HDR-400x284.jpg',
      order_detail: [
        { product_name: 'Ragel eyelse', qty: '2', price: '20000', total: '40000' },
        { product_name: 'Ragel eyelse v.2', qty: '1', price: '20000', total: '20000' },
      ],
      status: 'rejected'

    },

  ])


  const btnSeeDetail = (index, type) => {
    if (type === 'buka') {
      setModalSeedetail(true)
      setIndex(array[index])

    }
    else if (type === 'tutup') {
      setModalSeedetail(false)

    }
  }


  useEffect(() => {
    methodPost({
      endpoint: `/order/listAll?page=1`, data: {
        command: "rejected"
      }
    })
      .then(res => {
        console.log({ reject: res.success.data })
        if (res.success) {
          setArray(res.success.data)
          setMax_page(res.success.max_page)
        }
      })
  }, [])

  const btnPagination = (page) => {
    // loading(true)
    methodPost({
      endpoint: `/order/listAll?page=${page}`, data: {
        command: "rejected"
      }
    })
      .then(res => {
        console.log({ finish: res.success })
        if (res.success) {
          setArray(res.success.data)
          setMax_page(res.success.max_page)
        }
        // loading(false)
      })
  }

  return (
    <Container>
      {/* Modal */}
      <OrderDetailsTakeOffice show={modalseedetail} onhide={() => btnSeeDetail(index, "tutup")} dataModal={index ? index : []} />
      <div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            {/* New Orders : {'18'} */}
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
                <th>ORDER DETAILS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {
                array.map((item, index) => (
                  <tr key={index}>
                    <td>{item.member_id}</td>
                    <td>{item.created_at ? moment(item.created_at).format('ddd, DD MMMM YYYY') : item.created_at}</td>
                    <td>{item.order_id}</td>
                    <td>
                      <Button onClick={() => btnSeeDetail(index, "buka")}>See Details</Button>
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
color:#F95454;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
text-transform: uppercase;
`


const ContainerButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
`

const Container = styled.div`
padding:20px 20px
`
