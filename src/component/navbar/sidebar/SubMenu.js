import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false)


  const btnShowSubnav = () => setSubnav(!subnav)

  return (
    <div style={{ width: '100%' }}>
      <SidebarLink itemPath={item.path} to={item.path}
        onClick={btnShowSubnav}
      >
        <Menu>
          <img src={item.icon} alt="icon" /> &nbsp; {item.title}
        </Menu>
        <div>
          {item.subNav && subnav ? item.iconOpened : item.iconClosed}
        </div>
      </SidebarLink>
      {
        item.subNav !== undefined ? item.subNav.map((item, index) => (
          <DropDwonLink to={item.path} key={index}
            itemPath={item.path} subnav={subnav}
          >
            <Text subnav={subnav}>
              {item.title}

            </Text>
          </DropDwonLink>
        ))
          : null
      }
    </div>
  )
}

const Menu = styled.div`
align-items: center;
display: inline-flex;
`


const SidebarLink = styled(NavLink)`
display:flex;
color: ${({ itemPath }) => (itemPath === window.location.pathname ? '#707070' : '#707070')};
justify-content: space-between;
align-items:center;
padding:10px 15px;
list-style:none;
text-decoration: none;
font-size:12pt;
position:relative;
transition:450ms;
font-weight:${({ itemPath }) => (itemPath === window.location.pathname ? 600 : 400)};
left:0%;
background-color : ${({ itemPath }) => (itemPath === window.location.pathname ? '#F6F9FC' : 'transparent')};


&:hover {
  background : #F6F9FC;
  cursor:pointer;
  text-decoration: none;
  color:#707070;
  
}
`

const DropDwonLink = styled(NavLink)`
height: ${({ subnav }) => (subnav ? '50px' : '0px')};
padding-left:2.4rem;
display:flex;
width: 100%;
flex-direction: row;
align-items: center;
text-decoration:none;
color: ${({ itemPath }) => (itemPath === window.location.pathname ? '#707070' : '#707070')};
font-size:15px;
transition:340ms;
font-weight:${({ itemPath }) => (itemPath === window.location.pathname ? 600 : 400)};
background-color : ${({ itemPath }) => (itemPath === window.location.pathname ? '#F6F9FC' : 'transparent')};
transition: height 0.5s;
transition-timing-function: ease;

transition:450ms;

&:hover {
  background : #F6F9FC;
  cursor:pointer;
  text-decoration: none;
  color:#707070;
  
}
`

const Text = styled.div`
display:${({ subnav }) => (subnav ? 'block' : 'none')}

`
