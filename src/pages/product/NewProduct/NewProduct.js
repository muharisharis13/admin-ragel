import React, { useState, useContext, useEffect } from 'react'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import { Button } from '../../../component/element/Button'
import { AiOutlinePicture } from 'react-icons/ai'
import { Context } from '../../../service/context/Context'
import { LoadingPage } from '../../../component/loading/page/loading'
import { methodGET } from '../../../service/method/method'
import Select from 'react-select'
import { inputCurrency } from '../../../utl/Currency'

export const NewProduct = () => {
  const [data, setdata] = useState({
    product_name: '',
    product_description: '',
    product_category: '',
    product_pic: [],
    stock: '',
    PV1: '',
    PV2: '',
    product_price: '',
    selling_price: ''
  })
  const [category, setCategory] = useState([])
  const [labelimg, setLabelimg] = useState([])
  const { loading, apiproduk } = useContext(Context)
  const reader = new FileReader()
  const [ceklisCategory, setCeklisCategory] = useState(false)
  const [selectedCat, setSelectedCat] = useState("")


  useEffect(() => {
    methodGET({ endpoint: '/product/categoryList' })
      .then(res => {
        console.log(res.succcess)
        if (res.succcess) {

          setCategory(res.succcess.category_list.map(item => ({ value: item.category, label: item.category })))
        }
      })
  }, [])

  const onChangeValue = function (e, type) {
    switch (type) {
      case 'product_name':
        setdata({ ...data, product_name: e.target.value })
        break;
      case 'product_description':
        setdata({ ...data, product_description: e.target.value })
        break;
      case 'product_category':
        setdata({ ...data, product_category: e.target.value })
        break;
      case 'stock':
        setdata({ ...data, stock: e.target.value })
        break;
      case 'PV1':
        setdata({ ...data, PV1: e.target.value.replace(/[^0-9]+/g, '') })
        break;
      case 'PV2':
        setdata({ ...data, PV2: e.target.value.replace(/[^0-9]+/g, '') })
        break;
      case 'product_price':
        setdata({ ...data, product_price: e.target.value.replace(/[^0-9]+/g, '') })
        break;
      case 'selling_price':
        setdata({ ...data, selling_price: e.target.value.replace(/[^0-9]+/g, '') })
        break;

      default:
        // alert('error input')
        break;
    }
  }

  const onChangeImage = function (e) {
    reader.onload = function () {
      setLabelimg([...labelimg, reader.result])
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      setdata({ ...data, product_pic: [...data.product_pic, e.target.files[0]] })

    }
  }

  const btnAddProduk = function () {
    const formData = new FormData()

    formData.append('product_name', data.product_name)
    formData.append('product_description', data.product_description)
    formData.append('product_category', selectedCat.value)
    formData.append('product_pic', data.product_pic)
    formData.append('stock', data.stock)
    formData.append('PV1', 0)
    formData.append('PV2', 0)
    formData.append('product_price', data.product_price)
    formData.append('selling_price', data.selling_price)

    apiproduk({ type: 'ADD_PRODUK', data: formData })
  }

  const btnCeklis = (e) => {
    setCeklisCategory(e)
    setSelectedCat({})
  }


  console.log(data.product_pic)


  return (
    <Container bgColor="#F1F3F9" className="container-fluid">
      {/* {
        loading && <LoadingPage />
      } */}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Add New Product
        </div>

      </div>

      <div className="container-fluid">
        <Container2 className="row mt-5 ">
          <div className="col-md-12 col-sm-12" >
            <div className="row">
              <div className="col-md-12 col-sm-12" style={{ fontWeight: 700 }}>
                Add New Product
              </div>
            </div>

            <div className="row mt-4">
              <div className=" col-lg-6 col-md-6 col-sm-12">
                <div className="row justify-content-center align-items-center text-center">
                  <div className="col-md-12 col-sm-12 align-items-start text-start">
                    {
                      labelimg.map(item => (
                        <ImageProduct src={item} alt="img" />
                      ))
                    }
                    {/* <small>1080 x 720</small> */}
                  </div>
                  <div className="col-md-12 col-md-12 mt-2">
                    <input type="file" accept="image/png , image/jpg" id="Image" className="form-control" onChange={onChangeImage} style={{ display: 'none' }} />
                    <LabelButton htmlFor="Image" > <AiOutlinePicture /> Choose Image</LabelButton>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row mt-1">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="productname">Product Name</label>
                    <input id="productname" type="text" placeholder="Product Name..." className="form-control"
                      value={data.product_name} onChange={(e) => onChangeValue(e, 'product_name')}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" type="text" placeholder="Stock" className="form-control"
                      value={data.stock} onChange={(e) => onChangeValue(e, 'stock')}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="desc">Product Description</label>
                    <textarea style={{ resize: 'none' }} cols={10} rows={5} id="desc" type="text" placeholder="Product Description" className="form-control"
                      value={data.product_description} onChange={(e) => onChangeValue(e, 'product_description')}
                    />
                  </div>

                  {/* <div className="col-lg-6 col-md-12 col-sm-12">
                    <div>
                      <label htmlFor="lvl1">Point Value (PV) % Level 1</label>
                      <input id="lvl1" type="text" placeholder="Point Value (PV) % Level 1" className="form-control"
                        value={data.PV1 <= 100 ? data.PV1 : setdata({ ...data, PV1: '100' })} onChange={(e) => onChangeValue(e, 'PV1')}
                      />

                    </div>
                    <div className="mt-2">
                      <label htmlFor="lvl2">Point Value (PV) % Level 2</label>
                      <input id="lvl2" type="text" placeholder="Point Value (PV) % Level 2" className="form-control"
                        value={data.PV2 <= 100 ? data.PV2 : setdata({ ...data, PV2: '100' })} onChange={(e) => onChangeValue(e, 'PV2')}
                      />

                    </div>
                  </div> */}
                </div>

                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div>
                      Product Category
                    </div>
                    <div>
                      <Select options={category} value={selectedCat} onChange={(e) => setSelectedCat(e)} isDisabled={ceklisCategory ? true : false} />
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="checked" onChange={(e) => btnCeklis(e.target.checked)} />
                      <label className="form-check-label" for="checked">
                        Manual Category
                      </label>
                    </div>
                    {/* <div>
                      <input name="radio1" id="eyeShadow" value="eyeShadow" type="radio" onChange={(e) => onChangeValue(e, 'product_category')} /> &nbsp;
                      <label htmlFor="eyeShadow">EyeShadow</label>
                    </div>
                    <div>
                      <input name="radio1" id="lipstick" value="lipstick" type="radio" onChange={(e) => onChangeValue(e, 'product_category')} /> &nbsp;
                      <label htmlFor="lipstick">Lipstick</label>
                    </div> */}
                    {
                      ceklisCategory &&
                    <WrapperPrice className="mt-2">
                        <InputPrice type="text" placeholder="Add Category..." className="form-control" value={selectedCat.value} onChange={(e) => setSelectedCat({ value: e.target.value, label: e.target.value })} />
                    </WrapperPrice>
                    }
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <div className="row">
                      <WrapperPrice className="col-md-12 col-sm-12">
                        <LabelPrice htmlFor="price">Rp</LabelPrice>
                        <InputPrice id="price" type="text" placeholder="price" className="form-control"
                          value={inputCurrency(data.product_price)} onChange={(e) => onChangeValue(e, 'product_price')}
                        />
                      </WrapperPrice>
                      <WrapperPrice className="col-md-12 col-sm-12 mt-2">
                        <LabelPrice htmlFor="price">Rp</LabelPrice>
                        <InputPrice id="price" type="text" placeholder="selling price" className="form-control"
                          value={inputCurrency(data.selling_price)} onChange={(e) => onChangeValue(e, 'selling_price')}
                        />
                      </WrapperPrice>
                      {
                        data.selling_price < data.product_price ? <Caution>*please input the selling price above the product price</Caution> : null
                      }

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-items-center text-center mt-4">
            <WrapperButton className="col-lg-4 col-md-12 col-sm-12">
              <Button onClick={btnAddProduk}>Publish Product</Button>
            </WrapperButton>
          </div>
        </Container2>
      </div>


    </Container >
  )
}

const ImageProduct = styled.img`
width:50%;
object-fit: cover;
height:250px;
border-radius:8px;
`

const Caution = styled.small`
color:#ffbf00;
`

const LabelButton = styled.label`
font-weight:500;
font-size: 10pt;
padding:5px 10px;
border-radius: 7px;
border: 1px solid #FFBF00;
color:#7764E4;
justify-content: center;
align-items: center;
text-align: center;
cursor:pointer;
transition:850ms;

&:hover{
  background-color: #7764E4;
  border: 1px solid #7764E4;
  color: #fff;
}
`

const WrapperButton = styled.div`
@media only screen and (min-width:320px) and (max-width : 425px){
  margin-left: 8%;
}
`

const InputPrice = styled.input`
border-radius: 0px 07px 7px 0px;
/* border-left: none; */
`

const LabelPrice2 = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #FFBF00;
color:#fff;
padding:5.5px 10px;
font-weight:700;
border-radius:7px 0px 0px 07px;
cursor: pointer;
`

const LabelPrice = styled.label`
display: flex;
justify-content: center;
align-items: center;
background-color: #FFBF00;
color:#fff;
padding:5.5px 10px;
font-weight:700;
border-radius:7px 0px 0px 07px;
`

const WrapperPrice = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Container2 = styled.div`
background:#fff;
border-radius:10px;
padding:30px 30px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
`
