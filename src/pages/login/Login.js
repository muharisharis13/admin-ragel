import React, { useState, useContext } from 'react'
import { FaUserCircle, FaUserLock } from 'react-icons/fa'
import styled from 'styled-components'
import LogoHd from '../../image/logo/LogoHD.png'
import { LoadingPage } from '../../component/loading/page/loading'
import { Context } from '../../service/context/Context'
import { getCookies } from '../../service/cookies/Cookies'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { apiLoginSignUp, loading, redirect } = useContext(Context)


  const btnLogin = function (e) {
    e.preventDefault()
    apiLoginSignUp({
      type: 'LOGIN', data: {
        username: username,
        password: password
      }
    })
  }
  if (redirect || getCookies({ key: 'token' })) {
    window.location.href = "/"
  }


  return (
    <div className="container" style={{ position: 'relative', paddingBottom: '10px' }}>
      {
        loading && <LoadingPage />
      }
      <RowForm className="row justify-content-center align-items-center text-center">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <img src={LogoHd} alt="logo" width={100} />
        </div>
      </RowForm>
      <div className="row justify-content-center align-items-center mt-5">
        <ContainerForm className="col-lg-5 col-md-7 col-sm-12">
          <form onSubmit={btnLogin}>
          <ContainerFluid className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <WrapperInput className="col-md-10 col-sm-10">
                <Icon htmlFor="id">
                  <FaUserCircle />
                </Icon>
                <Input type="text" placeholder="ID Member" className="form-control" id="id"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10 mt-3">
                <Icon htmlFor="password">
                  <FaUserLock />
                </Icon>
                <Input type="password" placeholder="Password" className="form-control" id="password"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </WrapperInput>
              <WrapperInput className="col-md-10 col-sm-10 mt-3">
                  <Button type="submit" onClick={btnLogin}>Login</Button>
              </WrapperInput>
                {/* <WrapperInput className="col-md-10 col-sm-10 mt-1">
                <BntSignUp href="/signup">Sign Up Admin</BntSignUp>
              </WrapperInput> */}
            </div>
          </ContainerFluid>
          </form>
        </ContainerForm>
      </div>
    </div>
  )
}

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

const Button = styled.button`
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
padding:70px 30px;
position: relative;
`

const Input = styled.input`
border-radius: 0px 10px 10px 0px;
border-left: none;
transition: 850ms;

&:focus{
  border-color: #ffbf00;
}
`

const Icon = styled.div`
font-size: 16.5pt;
background-color: #FFBF00;
color:#fff;
padding: 5.5px 10px;
display: flex;
text-align: center;
justify-content: center;
align-items: center;
border-radius: 10px 0px 0px 10px;
`

const WrapperInput = styled.div`
display:inline-flex;
justify-content: center;
align-items: center;
`

const RowForm = styled.div`
position:  relative;
width: 100%;
margin-top:70px;
`


const ContainerForm = styled.div`
background : #fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:7px;
border: none;
`
