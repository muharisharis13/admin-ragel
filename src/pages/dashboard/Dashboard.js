import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from '../../component/card/Card'
import { ChartLine } from '../../component/chart/ChartLine'
import { VerticalChart } from '../../component/chart/VerticalChart'
import HomeW from '../../image/icon/home-white.png'
import BoxRound from '../../image/icon/boxrounded.png'
import DollarROund from '../../image/icon/dollarround.png'
import arrowdown from '../../image/icon/downarrow.png'
import arrowup from '../../image/icon/arrowup.png'
import { Context } from '../../service/context/Context'
import { methodPost } from '../../service/method/method'


export const Dashboard = () => {
  const { arrProduk, apiproduk, arrProdukSoldThisMonth } = useContext(Context)



  useEffect(() => {
    apiproduk({ type: 'GET_PRODUK' })
    // apiproduk({type:'POST_SOLD_BY_QUERY', data: {command:'year'}})
  }, [])



  return (
    <Container data-aos="fade-down" className="container-fluid">
      <div style={{ height: '100vh', paddingBottom: '100px' }}>
        <div className="row">
          <Wrapper className="col-md-3 col-sm-12">
            <div>
              <img src={HomeW} alt="Home" width={25} />
            </div>
            <div>
              Home &nbsp;&nbsp; - &nbsp;&nbsp; Dashboard
            </div>
          </Wrapper>
        </div>
        <div >

          <div className="row mt-5">
            <div className="col-md-12 col-lg-3 col-sm-12 mt-2">
              <Card
                img={arrowup}
                title="Profit"
                angka={`Rp. ${900000}`}
                path="/sales"
              />
            </div>
            <div className="col-md-12 col-lg-3 col-sm-12 mt-2">
              <Card
                title="New Members"
                img={arrowdown}
                angka={88}
                path="/member"
              />
            </div>
            <div className="col-md-12 col-lg-3 col-sm-12 mt-2">
              <Card
                img={BoxRound}
                title='Total Products'
                angka={arrProduk.length}
                textSince={false}
                path="/products/TotalProduct"
              />
            </div>
            <div className="col-md-12 col-lg-3 col-sm-12 mt-2">
              <Card
                img={DollarROund}
                title='Product Sold'
                angka={arrProdukSoldThisMonth.length}
                textSince={true}
                path="/products/TotalProductSold"
              />
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
            <ChartLine />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
            <VerticalChart />
          </div>
        </div>
      </div>
    </Container >
  )
}

const Wrapper = styled.div`
color:#fff;
display: inline-flex;
justify-content: space-evenly;
align-items: center;
`

const Container = styled.div`
height:60vh;
background:#D4D9DD;
margin-top: -80px;
padding-top:80px;
padding-bottom:100px;
transition:850ms;

@media only screen and (min-width: 320px) and (max-width: 425px){
  height:139vh
}
`


