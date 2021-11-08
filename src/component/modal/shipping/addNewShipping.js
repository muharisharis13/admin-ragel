import React, { useState, useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Select from 'react-select'
import { Context } from '../../../service/context/Context'
import { Button } from '../../element/Button'
import styled from 'styled-components'
import { inputCurrency } from '../../../utl/Currency'
import { methodPostImage } from '../../../service/method/method'
import swal from 'sweetalert';


// Require : 
// shipping_name
// shipping_category
// shipping_details
// shipping_fee

const options = [
  { value: 'Take At Office', label: 'Take At Office' },
  { value: 'Delivery (Delivery Gateway)', label: 'Delivery (Delivery Gateway)' },
  { value: 'Delivery Instan (Gojek / Grab)', label: 'Delivery Instan (Gojek / Grab)' }
]
export const AddnewShipping = ({ onHide, show }) => {
  const [category, setcategory] = useState('')
  const [data, setData] = useState({
    shipping_name: '',
    shipping_category: '',
    shipping_details: '',
    shipping_fee: 0,
    account_number: "",
    shipping_pic: "",
    domain_province: "",
    domain_city: "",
    domain_subdistrict: ""
  })
  const { apishipping, dispatch } = useContext(Context)
  const [imgLogo, setImgLogo] = useState("")
  const [options1, setOptions] = useState({
    provinsi: {},
    city: {}
  })
  const reader = new FileReader();
  const loading = (props) => dispatch({ type: "LOADING", loading: props })

  //   shipping_name
  // shipping_category
  // shipping_details
  // shipping_fee
  // account_number
  // shipping_pic
  // domain_province
  // domain_city
  // domain_subdistrict

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }


  const onChangeValue = (e, type) => {
    if (type === "fee") {
      setData({ ...data, [e.target.name]: e.target.value.replace(/[^0-9]+/g, '') })

    }
    else if (type === 'file') {
      setData({ ...data, [e.target.name]: e.target.files[0] })
      reader.onload = () => {
        setImgLogo(reader.result)
      }
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])

      }
    }
    else {
      setData({ ...data, [e.target.name]: e.target.value })

    }
  }


  const btnAdd = () => {

    const formData = new FormData()

    formData.append("shipping_name", data.shipping_name)
    formData.append("shipping_category", data.shipping_category.label)
    formData.append("shipping_details", data.shipping_details)
    formData.append("shipping_fee", data.shipping_fee)
    // formData.append("account_number", data.account_number)
    formData.append("shipping_pic", data.shipping_pic)
    formData.append("domain_province", data.domain_province.label)
    formData.append("domain_city", data.domain_city.label)
    formData.append("domain_subdistrict", data.domain_subdistrict)


    loading(true)

    methodPostImage({ endpoint: "/shipping/addNewShip", data: formData })
      .then(async res => {
        console.log(res)
        if (res.success) {
          // alert(`${res.success}`)

          await swal("SUCCESS", `${res.success}`, "success");

          await window.location.reload()
          loading(false)
        }

      })
  }


  useEffect(async () => {

    await fetch(
      "https://api.ragelbeauty.com/api/v1/user/loc/prov",
      {
        method: "GET",
        headers: headers
      }
    )
      .then(res => res.json())
      .then(res => {

        setOptions({
          ...options1, provinsi: res.success.list_provinsi
            .map(item => ({ value: item.province_id, label: item.province }))
        })
      })
  }, [])

  useEffect(async () => {
    setOptions({
      ...options1, city: {}
    })
    if (data.domain_province) {
      await fetch(
        `https://api.ragelbeauty.com/api/v1/user/loc/kota/${data.domain_province.value}`,
        {
          method: "GET",
          headers: headers
        }
      )
        .then(res => res.json())
        .then(res => {

          setOptions({
            ...options1, city: res.success.list_kota
              .map(item => ({ value: item.city_id, label: item.city_name }))
          })
        })

    }
  }, [data.domain_province])


  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header>
        <FaTimes onClick={onHide} /> &nbsp; <h4>Add New Shipping</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="shipping_name">Shipping Name</label>
              <input type="text" className="form-control" name="shipping_name" onChange={e => onChangeValue(e)} value={data.shipping_name} />
            </div>
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="shipping_category">Shipping Category</label>
              <Select id="shipping_category" value={data.shipping_category} options={options} onChange={(e) => setData({ ...data, shipping_category: e })} />
            </div>
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="shipping_details">Shipping Details</label>
              <textarea type="text" rows="5" className="form-control" name="shipping_details" onChange={e => onChangeValue(e)} value={data.shipping_details} />
            </div>
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="shipping_fee">Shipping Fee</label>
              <input type="text" className="form-control" name="shipping_fee" onChange={e => onChangeValue(e, 'fee')} value={inputCurrency(data.shipping_fee)} />
            </div>
            {/* <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="account_number">Shipping Number</label>
              <input type="text" className="form-control" name="account_number" onChange={e => onChangeValue(e, "fee")} value={data.account_number} />
            </div> */}
            <div className="col-md-6 col-sm-6 mb-3">
              <input type="file" name="shipping_pic" id="shipping_pic" onChange={e => onChangeValue(e, "file")} />
              {
                imgLogo &&
                <ImgLogo src={imgLogo} alt="Img" />
              }
            </div>
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="domain_province">Domain Province</label>
              <Select options={options1.provinsi} value={data.domain_province} onChange={e => setData({ ...data, domain_province: e })} />
            </div>
            <div className="col-md-6 col-sm-6 mb-3">

            </div>
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="domain_city">Domain City</label>
              <Select options={options1.city} value={data.domain_city} onChange={e => setData({ ...data, domain_city: e })} />
            </div>
            <div className="col-md-6 col-sm-6 mb-3">
            </div>
            <div className="col-md-6 col-sm-6 mb-3">
              <label htmlFor="domain_subdistrict">Domain Kecamatan</label>
              <textarea type="text" name="domain_subdistrict" className="form-control" value={data.domain_subdistrict} onChange={e => onChangeValue(e)} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="container">
          <div className="row  align-items-center justify-content-center">
            <div className="col-md-6 col-sm-12">
              <Button onClick={btnAdd}>Add New Shipping</Button>
            </div>
          </div>

        </div>

      </Modal.Footer>
    </Modal>
  )
}

const ImgLogo = styled.img`
width: 100%;
max-height: 100px;
object-fit: contain;
`
