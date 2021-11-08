import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import styled from 'styled-components'
import imgexmp from '../../../image/gettyimages-1129716834.png'
import { FaPencilAlt, FaPercent, FaTrash } from 'react-icons/fa'
import { LinkButton } from '../../../component/element/Button'
import { Context } from '../../../service/context/Context'
import { methodGET, methodPost } from '../../../service/method/method'
import { currency } from '../../../utl/Currency';
import swal from 'sweetalert';

export const TotalProduct = () => {
  const { dispatch } = useContext(Context)
  const [data, setData] = useState({
    data: [],
    max_page: 0,
    page: 1
  })
  const loading = (props) => dispatch({ type: "LOADING", loading: props })

  const getData = () => {
    loading(true)
    methodGET({ endpoint: '/product/all' })
      .then(res => {
        console.log(res.success)
        if (res.success) {
          setData({ ...data, data: res.success.data, max_page: res.success.max_page, page: res.success.page })
        }
        loading(false)
      })
  }


  useEffect(() => {
    if (data.data.length === 0) {
      getData()

    }
  }, [])

  const options = [
    { value: 'brush', label: 'brush' }
  ]


  const btnPagination = (page) => {
    loading(true)
    methodGET({ endpoint: `/product/all?page=${page}` })
      .then(res => {
        console.log(res)
        if (res.success) {
          res.success.data.map(item => {
            data.data.push(item)

          })
          setData({ ...data, page: res.success.page, max_page: res.success.max_page })

        }
        loading(false)
      })
  }


  const btnDelete = (id) => {
    loading(true)
    methodPost({
      endpoint: "/product/del", data: {
        product_id: id
      }
    })
      .then(async res => {
        if (res.success.status === "Sukses") {
          await swal("SUCCESS", `${res.success.message}`, "success");
          await getData()
          loading(false)
        }
        console.log(res)
      })
  }


  return (
    <Container data-aos="fade-down" bgColor="#F1F3F9" className="container-fluid" >
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product - Total Product
        </div>
      </div>

      {/* <div className="row justify-content-start  mt-2 align-items-center">
        <div className="col-lg-1 col-md-12 col-sm-12">
          <Title>
            Category
          </Title>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <Select
            options={options}
            placeholder="Select Category"
          />
        </div>
      </div> */}

      <div className="row mt-4">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Wrapper>
            <h3>{data.data.length}</h3> &nbsp; <Items>Items</Items>
          </Wrapper>
        </div>
      </div>

      <div className="container">

        <div className="row align-items-baseline mb-4" style={{ justifyContent: "stretch" }}>
          {
            data.data.map((item, index) => (
              <WrapperProduct className="col-lg-3 col-md-12 col-sm-12 mt-4" key={index}>
                <div>
                  <ImgProduct src={item.product_pic_url === "0" ? imgexmp : item.product_pic_url} alt="image" />
                </div>
                <ContainerProduct>
                  <TitleProduct className="mb-3">
                    {item.product_name}
                  </TitleProduct>
                  <Content className="mb-3">
                    {item.product_description}
                  </Content>
                  <Price className="mb-3">
                    {currency(item.selling_price)}
                  </Price>
                  <WrapperButton>
                    <LinkButton color="#000" to={{ pathname: "/products/PromotionsProduct", state: data.data[index] }}>
                      <ButtonProduct>
                        <FaPercent />
                      </ButtonProduct>
                    </LinkButton>
                    <LinkButton color="#000" to={{ pathname: "/products/EditProduct", state: data.data[index] }}>
                      <ButtonProduct>
                        <FaPencilAlt />
                      </ButtonProduct>
                    </LinkButton>
                    <ButtonProduct onClick={() => btnDelete(item.id)}>
                      <FaTrash />
                    </ButtonProduct>
                  </WrapperButton>

                </ContainerProduct>
              </WrapperProduct>

            ))
          }

        </div>
        <div className="row text-center align-items-center justify-content-center">
          <div className="col-md-5 col-sm-12 col-lg-5">
            {
              parseInt(data.page) === parseInt(data.max_page) ? null :
                <ButtonViewMore className="btn mb-3" onClick={() => btnPagination(parseInt(data.page) + 1)}>
                  View More
                </ButtonViewMore>
            }
            <p>
              <strong>{data.page}</strong> &nbsp;
              of
              &nbsp;<strong>{data.max_page}</strong>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

const ButtonViewMore = styled.div`
display: flex;
box-sizing : border-box;
align-items:center;
justify-content: center;
text-align:center;
border: 1px solid transparent;
font-size:13pt;
font-weight : 600;
background-color: #ffbf00;
color:#fff;
transition:250ms;

&:hover{
  border:1px solid #ffbf00;
  background-color: transparent;
}
`

const ButtonProduct = styled.div`
padding:0px 10px;
font-weight: 900;
font-size: 14pt;
cursor:pointer;
display:flex;
align-items: center;
justify-content: center;
text-align:center;
`

const WrapperButton = styled.div`
display: inline-flex;
align-items: flex-end;
justify-content: flex-end;
text-align:right;
width: 100%;
`

const Price = styled.div`
font-weight: 800;
font-size:15pt;
`

const Content = styled.div`
color: #172B4D;
font-weight:normal;
padding:5px 0px;
height: 150px;
overflow: auto;
`

const TitleProduct = styled.div`
font-weight:700;
font-size: 13pt;
text-align: center;
`

const ContainerProduct = styled.div`
padding:20px 20px;
display:flex;
flex-direction: column;
height:300px;
`

const WrapperProduct = styled.div`
background:#fff;
border-radius: 10px;
padding:0px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
margin:0px 20px;
display: inline-flex;
flex-direction: column;
`

const ImgProduct = styled.img`
width:100%;
border-radius: 10px 10px 0px 0px;
object-fit: cover;
height: 300px;
`

const Items = styled.span`
color:#5E4E4E;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
font-weight : 700;
`

const Title = styled.div`
font-weight:700;

`
