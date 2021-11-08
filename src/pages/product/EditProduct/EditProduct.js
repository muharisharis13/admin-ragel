import React, { useState, useContext, useEffect } from 'react'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import { AiOutlineCamera } from 'react-icons/ai'
import { Button } from '../../../component/element/Button'
import imgexmp from '../../../image/gettyimages-1129716834.png'
import { Context } from '../../../service/context/Context'
import { currency, inputCurrency } from '../../../utl/Currency'
import Select from 'react-select'
import { methodGET } from '../../../service/method/method'

export const EditProduct = (props) => {
  let prop = props.location.state !== undefined && props.location.state !== null ? props.location.state : window.location.href = "/product"
  const [data, setData] = useState({
    product_name: prop.product_name,
    product_desc: prop.product_description,
    stock: prop.stock,
    pvlvl1: prop.PV1,
    pvlvl2: prop.PV2,
    product_category: prop.product_category,
    price: prop.product_price,
    selling: prop.selling_price,
    dataImage: prop.product_pic_url
  })
  const [imageProduct, setImageProduct] = useState('')
  const { apiproduk } = useContext(Context)

  const [ceklisCategory, setCeklisCategory] = useState(false)
  const [category, setCategory] = useState([])
  const [selectedCat, setSelectedCat] = useState({ value: prop.product_category, label: prop.product_category })

  useEffect(() => {
    methodGET({ endpoint: '/product/categoryList' })
      .then(res => {
        console.log(res.succcess)
        if (res.succcess) {

          setCategory(res.succcess.category_list.map(item => ({ value: item.category, label: item.category })))
        }
      })
  }, [])

  const ChangeUploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setData({ ...data, dataImage: reader.result })
      }
    }
    if (e.target.files[0]) {

      reader.readAsDataURL(e.target.files[0])
      setImageProduct(e.target.files[0])
    }
  }

  const onChangeValue = ({ e, type }) => {
    switch (type) {
      case 'product_name':
        setData({ ...data, product_name: e.target.value })
        break;
      case 'product_desc':
        setData({ ...data, product_desc: e.target.value })
        break;
      case 'stock':
        setData({ ...data, stock: e.target.value })
        break;
      case 'pvlvl1':
        setData({ ...data, pvlvl1: e.target.value })
        break;
      case 'pvlvl2':
        setData({ ...data, pvlvl2: e.target.value })
        break;
      case 'product_category':
        setData({ ...data, product_category: e.target.value })
        break;
      case 'price':
        setData({ ...data, price: e.target.value })
        break;
      case 'selling':
        setData({ ...data, selling: e.target.value })
        break;

      default:
        // alert('Check onChange Input')
        break;
    }
  }



  const btnUpdate = () => {
    const formData = new FormData()

    formData.append('product_id', prop.id)
    formData.append('product_name', data.product_name)
    formData.append('product_description', data.product_desc)
    formData.append('product_category', selectedCat.value)
    formData.append('product_pic', imageProduct)
    formData.append('stock', data.stock)
    formData.append('PV1', data.pvlvl1)
    formData.append('PV2', data.pvlvl2)
    formData.append('product_price', parseInt(data.price))
    formData.append('selling_price', parseInt(data.selling))

    // const data1 = {
    //   product_id : prop.id,
    //   product_name : data.product_name,
    //   product_description : data.product_desc,
    //   product_category : data.product_category,
    //   stock : data.stock,
    //   PV1 : data.pvlvl1,
    //   PV2 : data.pvlvl2,
    //   product_price : parseInt(data.price),
    //   selling_price : parseInt(data.selling)
    // }

    apiproduk({ type: 'EDIT_PRODUK', data: formData })
    // console.log(data1)
  }

  const btnCeklis = (e) => {
    setCeklisCategory(e)
    setSelectedCat({})
  }


  return (
    <Container bgColor="#F1F3F9" className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Total Product
        </div>
      </div>

      <div className="container-fluid">
        <Container2 className="row mt-5 ">
          <div className="col-md-12 col-sm-12" >
            <div className="row">
              <div className="col-md-12 col-sm-12" style={{ fontWeight: 700 }}>
                Edit Product
              </div>
            </div>

            <div className="row">
              <div className=" col-lg-6 col-md-6 col-sm-12 mt-2">
                <div className="row justify-content-center align-items-center">
                  <WrapperProduct className="col-lg-7 col-md-12 col-sm-12 mt-4">
                    <WrapperImage>
                      <ImgProduct src={data.dataImage} alt="image" />
                      <input id="imageProduct" type="file" accept="image/*" style={{ display: 'none' }} onChange={ChangeUploadImage} />
                      <WrapperButtonImage>
                        <WrapperButtonImage2 htmlFor="imageProduct">
                          <AiOutlineCamera />
                        </WrapperButtonImage2>
                      </WrapperButtonImage>
                    </WrapperImage>
                    <ContainerProduct>
                      <TitleProduct>
                        {data.product_name}
                      </TitleProduct>
                      <Content>
                        {data.product_desc}
                      </Content>
                      <Price>
                        {currency(data.selling)}
                      </Price>
                    </ContainerProduct>
                  </WrapperProduct>

                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                <div className="row mt-1">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="productname">Product Name</label>
                    <input id="productname" type="text" placeholder="Product Name" className="form-control"
                      value={data.product_name} onChange={(e) => onChangeValue({ e: e, type: 'product_name' })}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" type="text" placeholder="Stock" className="form-control"
                      value={data.stock} onChange={(e) => onChangeValue({ e: e, type: 'stock' })}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <label htmlFor="desc">Product Description</label>
                    <textarea style={{ resize: 'none' }} cols={10} rows={5} id="desc" type="text" placeholder="Product Description" className="form-control"
                      value={data.product_desc} onChange={(e) => onChangeValue({ e: e, type: 'product_desc' })}
                    />
                  </div>

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
                    {
                      ceklisCategory &&
                    <WrapperPrice className="mt-2">
                        <InputPrice type="text" placeholder="Add Category..." className="form-control" value={selectedCat.value} onChange={(e) => setSelectedCat({ value: e.target.value, label: e.target.value })} />
                    </WrapperPrice>
                    }
                  </div>
                  <WrapperPrice className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <div className="row" >
                      <div>Price Product</div>
                      <div className="col-md-12 col-sm-12" style={{ display: 'inline-flex' }}>
                        <LabelPrice htmlFor="price">Rp</LabelPrice>
                        <InputPrice id="price" type="text" placeholder="Price..." className="form-control"
                          value={inputCurrency(data.price)} onChange={(e) => onChangeValue({ e: e, type: 'price' })}
                        />
                      </div>
                      <div className="mt-2">Selling Price</div>
                      <div className="col-md-12 col-sm-12" style={{ display: 'inline-flex' }}>
                        <LabelPrice htmlFor="price">Rp</LabelPrice>
                        <InputPrice id="price" type="text" placeholder="selling" className="form-control"
                          value={inputCurrency(data.selling)} onChange={(e) => onChangeValue({ e: e, type: 'selling' })}
                        />
                      </div>

                    </div>
                  </WrapperPrice>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center text-center mt-5">
            <WrapperButton className="col-lg-4 col-md-12 col-sm-12">
              <Button onClick={btnUpdate}>Publish Product</Button>
            </WrapperButton>
          </div>
        </Container2>
      </div>
    </Container>
  )
}

const WrapperImage = styled.div`
position:relative;
`
const WrapperButtonImage = styled.div`
position:absolute;

top:35%;
left:40%;
`
const WrapperButtonImage2 = styled.label`
font-size: 30pt;
background:#fff;
padding:10px 10px;
border-radius: 100%;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
cursor:pointer;
z-index:2;
`


const Price = styled.div`
font-weight: 800;
font-size:20pt;
`

const Content = styled.div`
color: #172B4D;
font-weight:normal;
padding:5px 0px;
word-wrap: break-word
`

const TitleProduct = styled.div`
font-weight:700;
font-size: 14pt;
text-align: center;
`

const ContainerProduct = styled.div`
padding:15px 20px;
`

const WrapperProduct = styled.div`
background:#fff;
border-radius: 10px;
padding:0px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
margin:0px 40px
`

const ImgProduct = styled.img`
width:100%;
max-height: 200px;
height:200px;
border-radius: 10px 10px 0px 0px;
object-fit: cover;
`


const WrapperButton = styled.div`
padding-bottom: 20px;
@media only screen and (min-width:320px) and (max-width : 425px){
  margin-left: 8%;
}
`

const InputPrice = styled.input`
border-radius: 0px 07px 7px 0px;
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
padding:10px 10px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
`
