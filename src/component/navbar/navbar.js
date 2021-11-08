import React, { useState } from 'react'
import styled from 'styled-components'
import { FaBars, FaRegBell, FaRegQuestionCircle, FaTimes } from 'react-icons/fa'
import { Sidebar } from './sidebar/Sidebar'

export const Navbar = () => {
  const [show, setShow] = useState(false)

  const btnSideShow = () => setShow(!show)

  return (
    <Container>
      <WrapperNavbar>
        <div className="left">
          <Role>
            ADMIN
          </Role>

          <Bars>
            <FaBars onClick={btnSideShow} />
          </Bars>

        </div>
        <div className="right">
          <WrapperIcon>
            <IconBell>
              <FaRegBell />
            </IconBell>
            <IconQuestion>
              <FaRegQuestionCircle />
            </IconQuestion>
          </WrapperIcon>
          <WrapperUser>
            <Img>
              <ImgUser src="https://mobirise.com/bootstrap-template/profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg" alt="profile" />
            </Img>
            <div>
              Muharis
            </div>
          </WrapperUser>

        </div>
      </WrapperNavbar>
      <WrapperSidebar show={show}>
        <Sidebar
          btnSideShow={btnSideShow}
        />
      </WrapperSidebar>
    </Container>
  )
}

const WrapperSidebar = styled.div`
position: fixed;
transition:850ms;
left: ${({ show }) => (show ? '0px' : '-1000px')};
top: 0;
box-shadow: 3px 0px 5px 0px rgba(0,0,0,0.34);
z-index:2;
@media only screen and (min-width: 426px){
  
left: 0;
}
`

const Bars = styled.div`
@media only screen and (min-width: 426px)  {
  display: none;
}
`


const WrapperNavbar = styled.div`
display: flex;
align-items: center;
width:100%;
padding:0px 10px;
justify-content: space-between;
color:#000;
padding-left: 280px;
z-index:2;
@media only screen and (min-width: 320px) and (max-width:425px) {
padding-left: 10px;
}
`


const Container = styled.nav`
height:80px;
display: inline-flex;
width:100%;
z-index:2;
`

const Role = styled.div`
text-transform: uppercase;

@media only screen and (min-width: 320px) and (max-width: 425px) {
  display: none;
}
`
const WrapperIcon = styled.div`
display: inline-flex;
padding:0px 10px;
`

const WrapperUser = styled.div`
display: inline-flex;
justify-content: center;
align-items: center;
`

const ImgUser = styled.img`
width: 50px;
height:50px;
object-fit: cover;
border-radius: 100%;
`

const IconBell = styled.div`
padding:0px 20px;
font-size:16pt;
`

const IconQuestion = styled.div`
padding:0px 20px;
font-size:16pt;
`

const Img = styled.div`
padding:0px 10px;
`
