import React, { useState, useContext } from 'react'
import { Container } from '../../../component/element/Container'
import styled from 'styled-components'
import { Button } from '../../../component/element/Button'
import { Container1 } from '../../../component/container/Container'
import { Context } from '../../../service/context/Context'
import { LoadingPage } from '../../../component/loading/page/loading'

export const Auth = () => {
  const [old, setOld] = useState({
    username: '',
    password: ""
  })
  const [new1, setNew] = useState({
    username: '',
    password: ''
  })
  const { loading, apiLoginSignUp } = useContext(Context)

  const onChangeValueNew = function (e, type) {

    switch (type) {
      case 'username':
        setOld({ ...old, username: e.target.value })
        break;
      case 'password':
        setOld({ ...old, password: e.target.value })
        break;
      case 'username1':
        setNew({ ...new1, username: e.target.value })
        break;
      case 'password1':
        setNew({ ...new1, password: e.target.value })
        break;

      default:
        // alert('error old input')
        break;
    }
  }

  const btnChangePassword = function () {
    apiLoginSignUp({
      type: 'CHANGE_AUTH', data: {
        old_username: old.username,
        old_password: old.password,
        new_username: new1.username,
        new_password: new1.password,
      }
    })
  }




  return (
    <Container data-aos="fade-down" bgColor className="container-fluid" style={{ height: '100vh' }}>
      {
        loading && <LoadingPage />
      }
      <div className="row justify-content-center align-content-center">
        <ContainerFromOld className="col-lg-4 col-md-12 col-sm-12">
          <div className="row text-center">
            <div className="col-md-12 col-sm-12">
              <Title htmlFor="Old Username">Old Username</Title>
              <input type="text" id="Old Username" className="form-control"
                value={old.username} onChange={(e) => onChangeValueNew(e, 'username')}
              />
            </div>
            <div className="col-md-12 col-sm-12 mt-2">
              <Title htmlFor="Old Password">Old Password</Title>
              <input type="password" id="Old Password" className="form-control"
                value={old.password} onChange={(e) => onChangeValueNew(e, 'password')}
              />
            </div>
          </div>
        </ContainerFromOld>
      </div>


      <div className="row justify-content-center align-content-center mt-4">
        <ContainerFromNew username={old.username} password={old.password} className="col-lg-4 col-md-12 col-sm-12">
          <div className="row text-center">
            <div className="col-md-12 col-sm-12">
              <Title htmlFor="New Username">New Username</Title>
              <input type="text" id="New Username" className="form-control"
                value={new1.username} onChange={(e) => onChangeValueNew(e, 'username1')}
              />

              <Small newUsername={new1.username} oldUsername={old.username}>*Please Change Your Username</Small>
            </div>
            <div className="col-md-12 col-sm-12 mt-2">
              <Title htmlFor="New Password">New Password</Title>
              <input type="password" id="New Password" className="form-control"
                value={new1.password} onChange={(e) => onChangeValueNew(e, 'password1')}
              />
            </div>
            <div className="col-md-12 col-sm-12 mt-5">
              <Button onClick={btnChangePassword}>Change Password</Button>
            </div>
          </div>
        </ContainerFromNew>
      </div>
    </Container>
  )
}

const Title = styled.label`
font-weight: 600;
`

const Small = styled.small`
color:red;
transition:450ms;
opacity: ${({ newUsername, oldUsername }) => (newUsername === oldUsername ? 1 : 0)};
`

const ContainerFromNew = styled.div`
background:#fff;
padding:20px 20px;
border-radius:7px;
transition:420ms;
opacity: ${({ username, password }) => (username && password ? '1' : '0')};
`

const ContainerFromOld = styled.div`
background:#fff;
padding:20px 20px;
border-radius:7px;
`
