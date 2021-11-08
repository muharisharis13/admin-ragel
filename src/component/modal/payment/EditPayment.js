import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { methodPost, methodPostImage } from '../../../service/method/method'
import { Button } from '../../element/Button'
import { Context } from '../../../service/context/Context';
import swal from 'sweetalert';

export const EditPayment = ({ show, onHide, data }) => {

  const [props, setProps] = useState({})
  const { dispatch } = useContext(Context)

  const loading = props => dispatch({ type: "LOADING", loading: props })

  useEffect(() => {
    setProps(data)
  }, [data])


  const onChangeValue = (e) => {
    setProps({ ...props, [e.target.name]: e.target.value })
  }

  const btnEdit = () => {
    loading(true)
    const formData = new FormData()

    formData.append("pay_gate_id", props.pay_gate_id)
    formData.append("account_name", props.account_name)
    formData.append("account_number", props.account_number)
    formData.append("pay_gate_bank", props.pay_gate_bank)
    formData.append("pay_gate_category", props.pay_gate_category)
    formData.append("pay_gate_name", props.pay_gate_name)
    formData.append("pay_gate_pic", props.pay_gate_pic)

    // const data1 = {
    //   id: props.id,
    //   pay_gate_id: props.pay_gate_id
    // }
    // console.log("ini data : ", data1)

    methodPostImage({ endpoint: "/paygate/edit", data: formData })
      .then(async res => {
        console.log(res)
        if (res.success) {
          // alert(res.success);

          await swal("SUCCESS", `${res.success}`, "success");
          await window.location.reload()
        }
        loading(false)
      })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <FaTimes cursor="pointer" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="Pay Gate Name">Pay Gate Name</label>
            <input type="text" className="form-control" id="Pay Gate Name" value={props.pay_gate_name} name="pay_gate_name" onChange={e => onChangeValue(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="Pay Gate Name">Pay Gate Category</label>
            <input type="text" className="form-control" id="Pay Gate Category" value={props.pay_gate_category} name="pay_gate_category" onChange={e => onChangeValue(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="Pay Gate Name">Pay Gate Bank</label>
            <input type="text" className="form-control" id="Pay Gate Bank" value={props.pay_gate_bank} name="pay_gate_bank" onChange={e => onChangeValue(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="Account Name">Account Name</label>
            <input type="text" className="form-control" id="Account Name" value={props.account_name} name="account_name" onChange={e => onChangeValue(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="Account Number">Account Number</label>
            <input type="text" className="form-control" id="Account Number" value={props.account_number} name="account_number" onChange={e => onChangeValue(e)} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={btnEdit}>Save Payment</Button>
      </Modal.Footer>
    </Modal>
  )
}
