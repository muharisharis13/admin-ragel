import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'

export const AddNewProduct = () => {
  return (
    <Container className="container-fluid">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-md-12 col-sm-12">
          <FaPlusCircle style={{ fontSize: '25pt' }} />
        </div>
        <Text className="col-md-12 col-sm-12 mt-2">
          Add New Product
        </Text>
      </div>

    </Container>
  )
}

const Text = styled.div`
font-weight: 700;
font-size:18pt;
text-decoration:none !important;
`

const Container = styled.div`
background:#FFBF00;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
padding:20px 0px;
color:#fff;
cursor:pointer;
border-radius:7px;
transition: 850ms;
text-decoration : none !important;

&:hover{
  background-color: #FFCF41;
}
`
