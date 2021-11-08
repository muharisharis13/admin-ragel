import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Container } from '../../../component/element/Container'
import { Context } from '../../../service/context/Context'
import { Button } from '../../../component/element/Button'
import { AddnewShipping } from '../../../component/modal/shipping/addNewShipping'
import { EditShpping } from '../../../component/modal/shipping/editShipping'
import { Pagination } from '../../../component/pagination/Pagination'
import { Search } from '../../../component/search/search'
import { methodGET } from '../../../service/method/method'
import { currency } from '../../../utl/Currency'

export const Shipping = () => {
  const { apishipping, arrShipping, max_pageShipping, dispatch } = useContext(Context)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState("")
  const loading = (props) => dispatch({ type: 'LOADING', loading: props })


  useEffect(() => {
    apishipping({ type: 'GET_SHIPPING', page: 1 })
  }, [])

  const btnModalEdit = (index) => {
    setModalEdit(!modalEdit)
    setIndex(index)
  }

  const btnPagination = (page) => {
    apishipping({ type: 'GET_SHIPPING', page: page })
  }

  const btnSearch = (e) => {
    e.preventDefault()
    loading(true)
    methodGET({ endpoint: `/shipping/getShip?search=${search}` })
      .then(res => {
        // dispatch({ type: 'SET_SHIPPING', arrShipping: res.success.data, max_pageShipping: res.success.max_page, pageShipping: res.success.page })
        console.log(res)
        loading(false)
      })
  }


  return (
    <Container data-aos="fade-down" bgColor className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          List Shipping
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <AddnewShipping show={modalAdd} onHide={() => setModalAdd(!modalAdd)} />
          <Button onClick={() => setModalAdd(!modalAdd)}>Add New Shipping Method</Button>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} btnSearch={btnSearch} />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <EditShpping show={modalEdit} onHide={() => setModalEdit(!modalEdit)} data1={arrShipping[index]} />
          <Table striped bordered hover responsive>
            <thead className="text-center">
              <tr>
                <th>Shipping Name</th>
                <th>Shipping category</th>
                <th>Shipping Detail</th>
                <th>Shipping Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                arrShipping.map((item, index) => (
                  <tr key={index}>
                    <td>{item.shipping_name}</td>
                    <td>{item.shipping_category}</td>
                    <td>{item.shipping_details}</td>
                    <td>{currency(item.shipping_fee)}</td>
                    <td>
                      <Button onClick={() => btnModalEdit(index)}>Edit Shipping</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div className="col-md-12 col-lg-12 col-sm-12 mt-4">
          <Pagination totalPage={max_pageShipping} btnPage={(page) => btnPagination(page)} />
        </div>
      </div>
    </Container>
  )
}
