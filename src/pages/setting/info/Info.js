import React, { useEffect, useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Container } from '../../../component/element/Container'
import styled from 'styled-components'
import { FaPencilAlt } from 'react-icons/fa'
import { Context } from '../../../service/context/Context'
import moment from 'moment'

export const Info = () => {
  const { apiLoginSignUp, arrInfo } = useContext(Context)
  const info = arrInfo[0]
  const [data, setData] = useState({
    full_name: '',
    address: '',
    email: '',
    birthdate: '',
    phone_number: '',
    wa: '',
    tele: '',
    insta: ''
  })

  useEffect(() => {
    apiLoginSignUp({ type: 'GET_INFO' })
  }, [])

  useEffect(() => {
    if (info) {
      setData({
        ...data,
        full_name: info.full_name,
        address: info.address,
        email: info.email,
        birthdate: new Date(info.birth_date),
        phone_number: info.phone_number,
        wa: info.contact_wa,
        tele: info.contact_tele,
        insta: info.contact_ig
      })

    }
  }, [info])


  const onChangeValue = (e, type) => {
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
      case 'birthdate':
        setData({ ...data, birthdate: e })
        break;
      case 'phone_number':
        setData({ ...data, phone_number: e.target.value })
        break;
      case 'wa':
        setData({ ...data, wa: e.target.value })
        break;
      case 'tele':
        setData({ ...data, tele: e.target.value })
        break;
      case 'insta':
        setData({ ...data, insta: e.target.value })
        break;

      default:
        // alert('error input')
        break;
    }
  }

  // console.log(info)


  const btnEditInfo = ({ data1 }) => {

    apiLoginSignUp({ type: 'CHANG_INFO', data: data1 })

    // console.log(data1)
  }

  return (
    <Container data-aos="fade-down" bgColor className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          Settings - Infomartion Admin
        </div>
      </div>
      <div className="container-fluid">
        <div className="row mt-3 justify-content-center align-items-center">
          <ContainerForm className="col-lg-10 col-md-12 col-sm-12">
            <div className="row justify-content-center ">
              <div className="col-lg-5 col-md-12 col-sm-12 mt-2">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <Title htmlFor="Full Name">Full Name</Title>
                    <ContainerInput>
                      <input type="text" className="form-control" placeholder="Full Name" id="Full Name"
                        value={data.full_name} onChange={(e) => onChangeValue(e, 'full_name')} disabled
                      />
                      {/* <IconPencil onClick={() => btnEditInfo({ data1: { full_name: data.full_name } })} /> */}
                    </ContainerInput>
                  </div>
                  <div className="col-md-12 col-sm-12 mt-2">
                    <Title htmlFor="Email">Email</Title>
                    <ContainerInput>
                      <input type="text" className="form-control" placeholder="Email" id="Email"
                        value={data.email} onChange={(e) => onChangeValue(e, 'email')} disabled
                      />
                      {/* <IconPencil onClick={() => btnEditInfo({ data1: { email: data.email } })} /> */}
                    </ContainerInput>
                  </div>
                  <div className="col-md-12 col-sm-12 mt-2">
                    <Title htmlFor="date">Birth Date</Title> <br />
                    <ContainerInput>
                      <DateBith className="form-control" id="date" selected={data.birthdate} dateFormat="dd MMMM yyyy" onChange={(e) => onChangeValue(e, 'birthdate')} disabled />
                      {/* <IconPencil onClick={() => btnEditInfo({ data1: { bith_date: moment(data.birthdate).format('YYYY-MM-DD') } })} /> */}
                    </ContainerInput>
                  </div>
                  <div className="col-md-12 col-sm-12 mt-2">
                    <Title htmlFor="Phone Number">Phone Number</Title>
                    <ContainerInput>
                      <input type="text" className="form-control" placeholder="Phone Number" id="Phone Number"
                        value={data.phone_number} onChange={(e) => onChangeValue(e, 'phone_number')}
                      />
                      <IconPencil onClick={() => btnEditInfo({ data1: { phone_number: data.phone_number } })}>Edit</IconPencil>
                    </ContainerInput>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 mt-2">
                <Title htmlFor="Address">Address</Title>

                <ContainerInput>
                  <TextArea name="Address" id="Address" cols="30" rows="5" className="form-control"
                    value={data.address} onChange={(e) => onChangeValue(e, 'address')} disabled
                  ></TextArea>
                  {/* <IconPencil onClick={() => btnEditInfo({ data1: { address: data.address } })} /> */}
                </ContainerInput>
              </div>
            </div>

            <div className="row mt-3 justify-content-center align-items-center">
              <div className="col-lg-3 col-md-12 text-center col-sm-12 mt-2">
                <div className="row text-center">
                  <div className="col-md-12 col-sm-12 mt-2">
                    <Title htmlFor="Whatsapp">Whatsapp</Title>
                    <ContainerInput>
                      <input type="text" className="form-control" placeholder="Whatsapp" id="Whatsapp"
                        value={data.wa} onChange={(e) => onChangeValue(e, 'wa')}
                      />
                      <IconPencil onClick={() => btnEditInfo({ data1: { contact_wa: data.wa } })} >Edit</IconPencil>
                    </ContainerInput>
                  </div>
                  <div className="col-md-12 col-sm-12 mt-2">
                    <Title htmlFor="Telegram">Telegram</Title>
                    <ContainerInput>
                      <input type="text" className="form-control" placeholder="Telegram" id="Telegram"
                        value={data.tele} onChange={(e) => onChangeValue(e, 'tele')}
                      />
                      <IconPencil onClick={() => btnEditInfo({ data1: { contact_tele: data.tele } })}>Edit</IconPencil>
                    </ContainerInput>
                  </div>
                  <div className="col-md-12 col-sm-12 mt-2">
                    <Title htmlFor="Instagram">Instagram</Title>
                    <ContainerInput>
                      <input type="text" className="form-control" placeholder="Instagram" id="Instagram"
                        value={data.insta} onChange={(e) => onChangeValue(e, 'insta')}
                      />
                      <IconPencil onClick={() => btnEditInfo({ data1: { contact_ig: data.insta } })}>Edit</IconPencil>
                    </ContainerInput>
                  </div>
                </div>
              </div>
            </div>

          </ContainerForm>
        </div>

      </div>
    </Container>
  )
}

const IconPencil = styled.div`
margin-left:10px;
cursor:pointer;
font-size:10pt;
transition:350ms;
&:hover {
  color:#ffbf00;
}
`

const ContainerInput = styled.div`
display:flex;
width: 100%;
justify-content: center;
align-items: center;
`

const InputSosmed = styled.input`
text-align:center;
`

const ContainerForm = styled.div`
background:#fff;
border-radius: 7px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
padding:30px 30px;
`

const TextArea = styled.textarea`
resize:none;
`

const Title = styled.label`
font-weight: 600;
font-size: 10pt;
`

const DateBith = styled(DatePicker)`
width:100%;
text-align:center;
`
