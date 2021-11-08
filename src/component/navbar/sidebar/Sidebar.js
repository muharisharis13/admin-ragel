import React from 'react'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import Logo from '../../../image/logo/LogoHD.png'
import { SidebarData } from '../data/sidebardata'
import { SubMenu } from './SubMenu'
import { TiPowerOutline } from 'react-icons/ti'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

export const Sidebar = ({ btnSideShow }) => {

  const btnLogout = () => {
    Cookies.remove('token')
    window.location.href = "/login"
  }

  return (
    <Container>
      <Times onClick={btnSideShow}>
        <FaTimes />
      </Times>
      <ImgLogo>
        <img src={Logo} alt="Logo" width={100} />
      </ImgLogo>
      <Menu>
        {
          SidebarData.map((item, index) => (
            <SubMenu key={index} item={item} />
          ))
        }
        <SidebarLink to="#" onClick={btnLogout}>
          <div>
            <TiPowerOutline fontSize="30pt" />  Logout
          </div>
        </SidebarLink>
      </Menu>
    </Container>
  )
}

const SidebarLink = styled(NavLink)`
display:flex;
color: #707070;
justify-content: space-between;
align-items:center;
list-style:none;
text-decoration: none;
font-size:12pt;
position:relative;
transition:450ms;
font-weight:400;
font-size:12pt;
left:5%;
background-color: transparent;
padding:10px 0px;


&:hover {
  background : #F6F9FC;
  cursor:pointer;
  text-decoration: none;
  color:#707070;
  
}
`

const Times = styled.div`
position:absolute;
right: 10px;
font-size:14pt;
@media only screen and (min-width: 426px) and (max-width: 1440px) {
  display: none;
}
`

const ImgLogo = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const Container = styled.div`
width:270px;
padding:10px 0px;
background-color: #fff;
font-weight: normal;
display: inline-block;
text-align: center;
justify-content: center;
align-items: center;
position:relative;
height:100vh;
/* overflow-y: auto; */
`

const Menu = styled.div`
display:inline-block;
padding-left:0px;
text-align:left;
justify-content:center;
align-items:center;
width:100%;
height:55vh;
background:transparent;
box-shadow: inset 0px -3px 8px -2px rgba(0,0,0,0.19);
overflow:scroll;
margin-top:10%;
/* font-weight:500; */

-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
