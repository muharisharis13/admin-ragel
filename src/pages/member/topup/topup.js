import React from 'react'
import { Container } from '../../../component/element/Container'
import { Navtabs } from './Navtabs/Navtabs'

export const TopupMember = () => {
  return (
    <Container bgColor data-aos="fade-down" className="container-fluid">
      <div className="row justify-content-center ">
        <div className="col-md-12 col-sm-12">
          Member Top Up
        </div>
      </div>
      <div className="row mt-5 justify-content-center align-items-center">
        <div className="col-md-12 col-sm-12 col-lg-12">
          <Navtabs />
        </div>
      </div>
    </Container>
  )
}
