import React, { useEffect, useContext } from 'react'
import { Cardproduct } from '../../../component/card/product/Card'
import { VerticalChartSales } from '../../../component/chart/sales/VerticalChart-sales'
import { Container } from '../../../component/element/Container'
import logobox from '../../../image/icon/boxwhite.png'
import boxrounded from '../../../image/icon/boxrounded.png'
import emoticon from '../../../image/icon/😍.png'
import discount from '../../../image/icon/discountrounded.png'
import { AddNewProduct } from '../../../component/card/product/addNewProduct'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Context } from '../../../service/context/Context'
import { LoadingPage } from '../../../component/loading/page/loading'

export const Product = () => {
  const { apiproduk, arrProduk, arrProdukSold, arrProdukSoldThisMonth, arrProdukPromosi } = useContext(Context)

  useEffect(() => {
    apiproduk({ type: 'GET_PRODUK' })
    apiproduk({ type: 'SOLD_ALL', page: '1' })
    apiproduk({ type: 'GET_PRODUCT_PROMOTION', page: '1' })
    apiproduk({ type: 'POST_SOLD_BY_QUERY', data: { command: 'month' } })
  }, [])

  return (
    <Container data-aos="fade-down" bgColor="#F1F3F9" className="container-fluid">
      {/* <small>
        1. api sold product this month (nunggu data masuk) <br />
        2. api GET product yang sedang promosi (nunggu data masuk) <br />
        3. api GET total product sold semua nya (nunggu data masuk) <br />
        4. api POST buat promosi (BEUM ADA API) <br />
      </small> */}
      <div className="row">
        <div className="col-md-12 col-sm-12" style={{ color: 'dimgray' }}>
          <img src={logobox} alt="logo" /> Product
        </div>
      </div>

      <div className="row mt-5 justify-content-center align-items-baseline">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <VerticalChartSales
            angkaTitle={arrProdukSoldThisMonth.length}
          />
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-md-12 mt-2">
              <Cardproduct
                logo={boxrounded}
                title="Total Product"
                small="Products"
                angka={arrProduk.length}
                display='true'
                link="/products/TotalProduct"
              />
            </div>
            <div className="col-md-12 mt-2">
                <Cardproduct
                  logo={emoticon}
                  title="Most Sold Product"
                  small="Item Sold"
                angka={arrProdukSold.length}
                  name="Lancome Eyeshow"
              />
            </div>
            <div className="col-md-12 mt-2">
              <Cardproduct
                logo={discount}
                title="Promo Products"
                small="Products"
                angka={arrProdukPromosi.length}
                display='true'
                link="/products/ListPromotionProduct"
              />
            </div>
          </div>

        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 mt-2">
          <LinkAddNew to="/products/addnewProduct">
            <AddNewProduct />
          </LinkAddNew>
        </div>
      </div>
    </Container>
  )
}


const LinkAddNew = styled(Link)`
text-decoration : none;
`
