import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { Card } from '../../card/Card'
import { VerticalChartSales } from '../../../component/chart/sales/VerticalChart-sales'
import { Context } from '../../../service/context/Context'
import moment from 'moment'
import imgDollar from '../../../image/icon/dollar.png'

export const SoldThisMonth = ({ show, onhide, data }) => {
  const { dataSoldThisMonth } = useContext(Context)


  // console.log('data', data)


  const mapper = single => {
    if (single !== undefined) {
      let d = moment(`${single.year}-${single.month}`).format('YYYY-MM').split('-');
      let p = Number(single.total_product_sold);
      return { year: d[0], month: d[1], price: p }

    }
  }

  const reducer = (group, current) => {
    let i = group.findIndex(single => single !== undefined ? (single.year === current.year && single.month === current.month) : null);
    if (i === -1) {
      return [...group, current];
    }
    group[i].price += current.price;
    return group
  }

  const sumProduct = dataSoldThisMonth.map(mapper).reduce(reducer, [])

  // console.log('sumProduct',sumProduct)

  const label = sumProduct.map(item => item && moment(`${item.year}-${item.month}`).format('YYYY-MMMM'))
  const dataChart = sumProduct.map(item => item && item.price)

  // console.log('label', label)
  // console.log('dataChart', dataChart)


  return (
    <Modal size="xl" show={show} onHide={onhide}>
      <Modal.Body style={{ padding: '40px 10px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <table className="table">
                <tr>
                  <th>Product Sold per this month</th>
                  <td>: {dataSoldThisMonth.length > 1 ? dataSoldThisMonth.reduce((a, b) => a.total_product_sold + b.total_product_sold, 0) : dataSoldThisMonth.length !== 0 ? dataSoldThisMonth[0].total_product_sold : 1}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-12 col-lg-4 col-sm-12">
              <Card title="PRODUCT SOLD" img={imgDollar} angka={dataSoldThisMonth.length > 1 ? dataSoldThisMonth.reduce((a, b) => a + + b.total_product_sold, 0) : dataSoldThisMonth.length !== 0 ? dataSoldThisMonth[0].total_product_sold : 1} />
            </div>
            <div className="col-md-12 col-lg-8 col-sm-12">
              <VerticalChartSales label={label} data1={dataChart} angkaTitle={dataSoldThisMonth.length > 1 ? dataSoldThisMonth.reduce((a, b) => a.total_product_sold + b.total_product_sold, 0) : dataSoldThisMonth.length !== 0 ? dataSoldThisMonth[0].total_product_sold : 1} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
