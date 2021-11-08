import React, { useState, useContext } from 'react'
import { FaUserCircle, FaUserLock } from 'react-icons/fa'
import styled from 'styled-components'
import LogoHd from '../../image/logo/LogoHD.png'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { ApiLoginSignUp } from '../../service/functionAPI/login/ApiLoginSignUp'
import { Context } from '../../service/context/Context'
import { LoadingPage } from '../../component/loading/page/loading'

export const SignUp = () => {
  const { loading, apiLoginSignUp } = useContext(Context)
  const [data, setData] = useState({
    full_name: "",
    address: "",
    email: "",
    birth_date: new Date(),
    phone_number: "",
    contact_wa: "",
    contact_tele: "",
    contact_ig: "",
  })

  const onChangeValueData = ({ e, type }) => {
    switch (type) {
      case 'full_name':
        setData({ ...data, full_name: e.target.value })
        break;
      case 'address':
        setData({ ...data, address: e.target.value })
        break;
      case 'email':
        setData({ ...data, email: e.target.value })
        break;

      case 'birth_date':
        setData({ ...data, birth_date: e })
        break;
      case 'phone_number':
        setData({ ...data, phone_number: e.target.value.replace(/[^0-9]+/g, '') })
        break;
      case 'contact_wa':
        setData({ ...data, contact_wa: e.target.value.replace(/[^0-9]+/g, '') })
        break;
      case 'contact_tele':
        setData({ ...data, contact_tele: e.target.value })
        break;
      case 'contact_ig':
        setData({ ...data, contact_ig: e.target.value })
        break;

      default:
        // alert('wrong onchange')
        break;
    }
  }

  const btnSignUp = () => {
    let data1 = {
      full_name: data.full_name,
      address: data.address,
      email: data.email,
      birth_date: moment(data.birth_date).format('yyyy-MM-DD'),
      phone_number: data.phone_number,
      contact_wa: data.contact_wa,
      contact_tele: data.contact_tele,
      contact_ig: data.contact_ig,
    }
    apiLoginSignUp({ type: 'REGISTER', data: data1 })
  }


  return (
    <div className="container" style={{ position: 'relative', height: '100vh' }}>
      {
        loading && <LoadingPage />
      }
      {/* <RowForm className="row justify-content-center align-items-center text-center">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <img src={LogoHd} alt="logo" width={100} />
        </div>

      </RowForm> */}
      <div className="row justify-content-center align-items-center pb-5">
        <ContainerForm className="col-lg-5 col-md-7 col-sm-12 mt-5">
          <ContainerFluid className="container-fluid">
            <div className="row justify-content-center align-items-center text-center">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h5>ADD ADMIN</h5>
              </div>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="id">
                  Full Name
                </Icon>
                <Input type="text" placeholder="Full Name" className="form-control" id="id" value={data.full_name} onChange={(e) => onChangeValueData({ e: e, type: 'full_name' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="address">
                  Address
                </Icon>
                <Textarea rows={5} type="text" placeholder="address" className="form-control" id="address" value={data.address} onChange={(e) => onChangeValueData({ e: e, type: 'address' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="email">
                  Email
                </Icon>
                <Input type="email" placeholder="Email" className="form-control" id="email" value={data.email} onChange={(e) => onChangeValueData({ e: e, type: 'email' })} />
              </WrapperInput>
              <WrapperInput style={{ display: 'inline-block', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} className="col-md-10 col-sm-10">
                <Icon htmlFor="birth">
                  Birthday
                </Icon>
                <DateBirth className="form-control" selected={data.birth_date} dateFormat="dd MMMM yyyy" onChange={(e) => onChangeValueData({ e: e, type: 'birth_date' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="phone_number">
                  Phone Number
                </Icon>
                <Input type="text" placeholder="Phone Number" className="form-control" id="phone_number" value={data.phone_number} onChange={(e) => onChangeValueData({ e: e, type: 'phone_number' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="Whatsapp">
                  Whatsapp (opsional)
                </Icon>
                <Input type="text" placeholder="Whatsapp" className="form-control" id="Whatsapp" value={data.contact_wa} onChange={(e) => onChangeValueData({ e: e, type: 'contact_wa' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="Instagram">
                  Instagram (opsional)
                </Icon>
                <Input type="text" placeholder="Instagram" className="form-control" id="Instagram" value={data.contact_ig} onChange={(e) => onChangeValueData({ e: e, type: 'contact_ig' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="Telegram">
                  Telegram (opsional)
                </Icon>
                <Input type="text" placeholder="Telegram" className="form-control" id="Telegram" value={data.contact_tele} onChange={(e) => onChangeValueData({ e: e, type: 'contact_tele' })} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10 mt-3">
                <Button onClick={btnSignUp}>{'Sign Up'}</Button>
              </WrapperInput>
            </div>
          </ContainerFluid>
        </ContainerForm>
      </div>
    </div>
  )
}

const DateBirth = styled(DatePicker)`
border-radius: 10px 10px 10px 10px;
transition: 850ms;
text-align:center;
align-items:center;
display: inline-flex;
justify-content: center;
cursor: pointer;

&:focus{
  border-color: #ffbf00;
}
`

const Textarea = styled.textarea`
border-radius: 10px 10px 10px 10px;
transition: 850ms;
resize: none;

&:focus{
  border-color: #ffbf00;
}
`

const BntSignUp = styled.a`
text-decoration: none;
color:#000;
font-weight: 600;
font-size:9pt;
&:hover {
  color:#000;
  text-decoration: underline;
}
`

const Button = styled.div`
text-decoration: none;
display: inline-flex;
background: #ffbf00;
color:#fff;
font-weight: 700;
text-transform: uppercase;
width: 100%;
text-align: center;
justify-content: center;
align-items: center;
border-radius:7px;
padding:5px 0px;
cursor:pointer;
transition: 850ms;
border:1px solid #ffbf00;

&:hover{
  color: gray;
  background:none;
  border:1px solid #ffbf00;
  padding:5px 0px;
}
`

const ContainerFluid = styled.div`
padding:40px 30px;
position: relative;
`

const Input = styled.input`
border-radius: 10px 10px 10px 10px;
transition: 850ms;
text-align:center;

&:focus{
  border-color: #ffbf00;
}
`

const Icon = styled.div`
color:#707070;
display: flex;
text-align: center;
justify-content: center;
align-items: center;
font-weight:600;
`

const WrapperInput = styled.div`
display:inline-block;
justify-content: center;
align-items: center;
margin-top:10px;
`

const RowForm = styled.div`
position:  relative;
width: 100%;
margin-top:20px;
`


const ContainerForm = styled.div`
background : #fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:7px;
border: none;
`
