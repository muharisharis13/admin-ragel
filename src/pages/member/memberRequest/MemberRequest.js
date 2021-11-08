import React, { useEffect, useState, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { Container } from '../../../component/element/Container'
import { methodGET, methodPost } from '../../../service/method/method'
import styled from 'styled-components'
import { ModalSeeDetail } from './component/ModalSeeDetail'
import { Pagination } from '../../../component/pagination/Pagination'
import { Context } from '../../../service/context/Context'


export const MemberRequest = () => {
  const [data, setData] = useState([])
  const [max_page, setMax_page] = useState(0)
  const [current_page, setCurrent_page] = useState(1)
  const [showSeeDetail, setshowSeeDetail] = useState(false)
  const [dataprops, setDataprops] = useState({})
  const { dispatch } = useContext(Context)
  const loading = (props) => dispatch({ type: 'LOADING', loading: props })

  useEffect(async () => {
    loading(true)
    methodGET({ endpoint: '/member/req' })
      .then(res => {
        console.log(res)
        if (res.success) {
          setData(res.success.data)
          setMax_page(res.success.max_page)
          setCurrent_page(res.success.page)
        }
        loading(false)
      })
  }, [])

  const btnSeeDetail = (index) => {
    setshowSeeDetail(true)
    setDataprops(data[index])
  }

  const btnPagination = (page = "") => {
    const url = `/member/req?${page && `page=${page}`}`

    loading(true)
    methodGET({ endpoint: url })
      .then(res => {
        console.log(res)
        if (res.success) {
          setData(res.success.data)
          setMax_page(res.success.max_page)
          setCurrent_page(res.success.page)
        }
        loading(false)
      })
  }

  return (
    <Container bgColor data-aos="fade-down" className="container-fluid">
      {/* Modal */}
      <ModalSeeDetail show={showSeeDetail} data={dataprops} onHide={() => setshowSeeDetail(false)} />
      <div className="row mb-5">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <strong>Member Request</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-lg-12 mb-3">
          <Table responsive striped bordered>
            <thead className="text-center">
              <tr>
                <th>MEMBER NAME</th>
                <th>PARTNER ID</th>
                <th>USER INFO</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                data.length > 0 ? data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.full_name}</td>
                    <td>{item.partner_id}</td>
                    <td >
                      <table>
                        <tbody>
                          <tr>
                            <th>Email</th>
                            <td>: {item.email}</td>
                          </tr>
                          <tr>
                            <th>Phone Number</th>
                            <td>: {item.phone_number}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>: {item.gender}</td>
                          </tr>
                          <tr>
                            <th>Jobs</th>
                            <td>: {item.jobs}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <Accept onClick={() => btnSeeDetail(index)}>See Detail</Accept>
                    </td>
                  </tr>
                ))
                  : "Nothing Data"
              }
            </tbody>

          </Table>
        </div>
        <div className="col-md-12 col-sm-12 col-lg-12">
          <Pagination totalPage={max_page} btnPage={(page) => btnPagination(page)} />
        </div>
      </div>
    </Container>
  )
}

const Accept = styled.div`
cursor:pointer;
color:#fff;
background:#FFBF00;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
text-align:center;
display: flex;
align-items:center;
justify-content: center;
`
