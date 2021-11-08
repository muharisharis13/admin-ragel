import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { methodPost, methodPostImage } from '../../../service/method/method'
import { Button } from '../../../component/element/Button'
import { Context } from '../../../service/context/Context';
import swal from 'sweetalert';

export const AddPaymentGate = ({ show, onHide }) => {

  const [data, setData] = useState({
    account_name: "",
    account_number: "",
    pay_gate_bank: "",
    pay_gate_category: "",
    pay_gate_name: "",
    pay_gate_pic: "",
  })
  const [img, setImg] = useState("")
  const reader = new FileReader();
  const { dispatch } = useContext(Context)
  const loading = (props) => dispatch({ type: 'LOADING', loading: props })


  const onChangeValue = (e, type) => {

    if (type === 'file') {
      reader.onload = () => {
        setImg(reader.result)
      }
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
        setData({ ...data, [e.target.name]: e.target.files[0] })
      }

    }
    else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }


  // http://api.ragelbeauty.com/api/v1/adm/paygate/add

  //   error:
  // account_name: ['The account name field is required.']
  // account_number: ['The account number field is required.']
  // pay_gate_bank: ['The pay gate bank field is required.']
  // pay_gate_category: ['The pay gate category field is required.']
  // pay_gate_name: ['The pay gate name field is required.']
  // pay_gate_pic: ['The pay gate pic field is required.']


  const btnAddPayment = () => {
    const formData = new FormData()

    formData.append("account_name", data.account_name)
    formData.append("account_number", data.account_number)
    formData.append("pay_gate_bank", data.pay_gate_bank)
    formData.append("pay_gate_category", data.pay_gate_category)
    formData.append("pay_gate_name", data.pay_gate_name)
    formData.append("pay_gate_pic", data.pay_gate_pic)

    loading(true)

    methodPostImage({ endpoint: "/paygate/add", data: formData })
      .then(async res => {
        if (res.success) {
          // alert(`${res.success}`);

          await swal("SUCCESS", `${res.success}`, "success");
          await window.location.reload()
        }
        console.log(res)
        loading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>Add Payment Gate</Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account_name">Account Name</label>
                <input type="text" className="form-control" id="account_name" name="account_name" value={data.account_name} onChange={e => onChangeValue(e)} />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="account_number">Account Number</label>
                <input type="text" className="form-control" id="account_number" name="account_number" value={data.account_number} onChange={e => onChangeValue(e)} />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="pay_gate_bank">Payment Bank</label>
                <input type="text" className="form-control" id="pay_gate_bank" name="pay_gate_bank" value={data.pay_gate_bank} onChange={e => onChangeValue(e)} />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="mb-3">
                <label htmlFor="pay_gate_category">Payment Category</label>
                <input type="text" className="form-control" id="pay_gate_category" name="pay_gate_category" value={data.pay_gate_category} onChange={e => onChangeValue(e)} />
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="mb-3">
                <label htmlFor="pay_gate_name">Payment Name</label>
                <input type="text" className="form-control" id="pay_gate_name" name="pay_gate_name" value={data.pay_gate_name} onChange={e => onChangeValue(e)} />
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="mb-3">
                <label htmlFor="pay_gate_pic">Payment Picture</label>
                <input type="file" name="pay_gate_pic" id="pay_gate_pic" onChange={e => onChangeValue(e, "file")} />
                <br />
                {
                  img && <img src={img} width={200} className="mt-3" />
                }
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={btnAddPayment}>Add Payment Gate</Button>
      </Modal.Footer>
    </Modal>
  )
}
