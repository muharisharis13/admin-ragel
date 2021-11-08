import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Button } from '../../component/element/Button'
import { Container } from '../../component/element/Container'
import { AddPaymentGate } from '../../component/modal/payment/AddPaymentGate'
import { EditPayment } from '../../component/modal/payment/EditPayment'
import { methodGET } from '../../service/method/method'

export const PaymentGate = () => {
  const [data, setData] = useState({
    data: [],
    page: 1,
    max_page: 0
  })
  const [props, setProps] = useState({})
  const [show, setShow] = useState({
    edit: false,
    add: false
  })

  useEffect(() => {
    methodGET({ endpoint: "/paygate/all" })
      .then(res => {
        console.log(res)

        if (res.success) {
          setData({
            ...data,
            data: res.success.data,
            max_page: res.success.max_page,
            page: res.success.page
          })
        }
      })
  }, [])


  const btnShowModalAdd = (type) => {

    if (type === "buka") {
      setShow({ ...show, add: true })

    }
    else {
      setShow({ ...show, add: false })

    }
  }

  const btnShowModalEdit = (index, type) => {

    if (type === "buka") {
      setProps(data.data[index])
      setShow({ ...show, edit: true })

    }
    else {
      setShow({ ...show, edit: false })

    }
  }

  return (
    <Container data-aos="fade-down" bgColor className="container-fluid">
      <EditPayment show={show.edit} onHide={() => btnShowModalEdit(0, "tutup")} data={props} />
      <div className="row mb-5">
        <div className="col-md-12 col-sm-12 col-lg-12">
          List Payment
        </div>
      </div>

      <div className="row">
        <AddPaymentGate show={show.add} onHide={() => btnShowModalAdd("tutup")} />
        <div className="col-md-4 col-sm-12">
          <Button onClick={() => btnShowModalAdd("buka")}>Add Payment Gate</Button>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12 col-sm-12 col-lg-12">
          <Table striped bordered hover responsive>
            <thead className="text-center">
              <tr>
                <th>Pay Gate Name</th>
                <th>Pay Gate Category</th>
                <th>Pay Gate Bank</th>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.pay_gate_name}</td>
                    <td>{item.pay_gate_category}</td>
                    <td>{item.pay_gate_bank}</td>
                    <td>{item.account_name}</td>
                    <td>{item.account_number}</td>
                    <td>
                      <Button onClick={() => btnShowModalEdit(index, "buka")}>Edit Payment</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  )
}
