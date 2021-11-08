import React, { useState, useContext, useEffect } from 'react'
import { FaChartBar } from 'react-icons/fa'
import { CardSales } from '../../component/card/sales/Card'
import { ChartLineSales } from '../../component/chart/sales/ChartLine-sales'
import { VerticalChartSales } from '../../component/chart/sales/VerticalChart-sales'
import { DatePicker2 } from '../../component/datepicker/DatePicker'
import styled from 'styled-components'
import { CardBestSalesPerson } from '../../component/card/sales/CardBestSalesPerson'
import { Context } from '../../service/context/Context'

export const Sales = () => {
  const [date, setDate] = useState({
    start: new Date(),
    end: new Date()
  })

  const { apiproduk, arrProdukSold, arrProdukSoldThisMonth } = useContext(Context)


  useEffect(() => {
    apiproduk({ type: 'POST_SOLD_BY_QUERY', data: { command: 'month' } })
    apiproduk({ type: 'SOLD_ALL', page: '1' })
  }, [])


  return (
    <Container data-aos="fade-down" className="container-fluid" >
      {/* <small>
        - api grafik monthly /bulan profit belum ada <br />
        - api penjualan terbaik sales member belum ada <br />
      </small> */}
      <div className="row">
        <div className="col-lg-2 col-md-12 col-sm-12">
              <FaChartBar /> &nbsp; Sales
            </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
              <DatePicker2
                start={date.start}
                end={date.end}
                onChangeStart={(e) => setDate({ ...date, start: e })}
                onChangeEnd={(e) => setDate({ ...date, end: e })}
              />
            </div>
          </div>


      <div className="row mt-3">
        <div className="col-lg-8 col-md-12 col-sm-12 mt-2">
          <ChartLineSales />
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 mt-2">
          <VerticalChartSales
            angkaTitle={arrProdukSoldThisMonth.length}
          />
        </div>
      </div>
      {/* {
        JSON.stringify(arrProdukSold.sort((a, b) => b.sold - a.sold)[0].product_name)
      } */}
      <div className="row mt-3 pb-5">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-md-6 mt-2">
              <CardSales angkaSales={arrProdukSold.length}
                name={arrProdukSold.sort((a, b) => b.sold - a.sold)[0] && arrProdukSold.sort((a, b) => b.sold - a.sold)[0].product_name}
              />
            </div>
            <div className="col-md-6 mt-2">
              <CardBestSalesPerson
                number={"200"}
                name={"muharis"}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}


const Container = styled.div`
background:#F1F3F9;
margin-top: -80px;
padding-top:80px;
padding-bottom:100px;
`
