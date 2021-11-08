import React, { useState, useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Select from 'react-select'
import { Context } from '../../../service/context/Context'
import { Button } from '../../element/Button'


// Require : 
// shipping_name
// shipping_category
// shipping_details
// shipping_fee

const options = [
  { value: 'COD - Office (Ambil di kantor)', label: 'COD - Office (Ambil di kantor)' },
  { value: 'Delivery (Delivery Gateway)', label: 'Delivery (Delivery Gateway)' },
  { value: 'Delivery Instan (Gojek / Grab)', label: 'Delivery Instan (Gojek / Grab)' }
]
export const EditShpping = ({ onHide, show, data1 }) => {
  const [category, setcategory] = useState('')
  const [data, setData] = useState({
    name: '',
    detail: '',
    fee: ''
  })
  const { apishipping } = useContext(Context)

  useEffect(() => {
    if (data1) {
      setData({
        ...data,
        name: data1.shipping_name,
        detail: data1.shipping_details,
        fee: data1.shipping_fee
      })
      setcategory({ value: data1.shipping_category, label: data1.shipping_category })
    }
  }, [data1])

  const onChangeValue = (e, type) => {

    switch (type) {
      case 'name':
        setData({ ...data, name: e.target.value })
        break;
      case 'detail':
        setData({ ...data, detail: e.target.value })
        break;
      case 'fee':
        setData({ ...data, fee: e.target.value.replace(/[^0-9]+/g, '') })
        break;

      default:
        break;
    }
  }


  const btnAdd = () => {
    apishipping({
      type: 'POST_EDIT_SHIPPING_METHOD', data: {
        shipping_id: data1.shipping_id,
        shipping_name: data.name,
        shipping_category: category.value,
        shipping_details: data.detail,
        shipping_fee: data.fee
      }
    })
  }

  // console.log(data1)

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <FaTimes onClick={onHide} /> &nbsp; <h4>Add New Shipping</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <label htmlFor="name">Shipping Name</label>
              <input type="text" id="name" placeholder="Shipping Name" className="form-control"
                value={data.name} onChange={(e) => onChangeValue(e, 'name')}
              />
            </div>
            <div className="col-md-12 col-sm-12">
              <label htmlFor="category">Shipping Category</label>
              <Select id="category" value={category} options={options} onChange={(e) => setcategory(e)} />
            </div>
            <div className="col-md-12 col-sm-12">
              <label htmlFor="details">Shipping Details</label>
              <input type="text" id="details" placeholder="Shipping Name" className="form-control"
                value={data.detail} onChange={(e) => onChangeValue(e, 'detail')} />
            </div>
            <div className="col-md-12 col-sm-12">
              <label htmlFor="fee">Shipping Fee</label>
              <input type="text" id="fee" placeholder="Shipping Name" className="form-control"
                value={data.fee} onChange={(e) => onChangeValue(e, 'fee')} />
            </div>

          </div>
          <div className="row mt-5">
            <div className="col-md-12 col-sm-12">
              <Button onClick={btnAdd}>Add New Shipping</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}
