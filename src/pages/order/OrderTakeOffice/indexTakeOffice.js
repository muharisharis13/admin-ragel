import React from 'react'
import { Container } from '../../../component/element/Container'
import Grid from '../../../image/icon/sidebar/grid.png'
import { Navtabs } from './component/navtab'

export const IndexOrderTakeOffice = () => {
  return (
    <Container bgColor data-aos="fade-down" className="container-fluid">
      <div className="row justify-content-center ">
        <div className="col-md-12 col-sm-12">
          <img src={Grid} alt="logo" /> &nbsp; Order
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-lg col-md-12 col-sm-12">
          <Navtabs />
        </div>
      </div>
    </Container>
  )
}
