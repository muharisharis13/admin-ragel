import React, { useContext, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Card } from '../../card/Card'
import { ChartLineSales } from '../../../component/chart/sales/ChartLine-sales'
import linetoup from '../../../image/icon/arrowup.png'
import { Context } from '../../../service/context/Context'
import moment from 'moment'

export const ProfitThisMonth = ({ show, onhide, total_profit }) => {
  const { dataProfitThisMonth } = useContext(Context)


  const all = [].concat(dataProfitThisMonth.profit_1stLine, dataProfitThisMonth.profit_2ndLine, dataProfitThisMonth.profit_sold_product)

  console.log('all',all)

  const mapper = single => {

    if (single !== undefined) {
      let d = moment(`${single.year}-${single.month}`).format('YYYY-MM').split('-');
      let p = Number(single.total_profit);
      return { year: d[0], month: d[1], price: p };

    }
  }

  const reducer = (group, current) => {
    let i = group.findIndex(single => single !== undefined ? (single.year === current.year && single.month === current.month) : null);
    if (i === -1) {
      return [...group, current];
    }

    group[i].price += current.price;
    return group;
  };

  const sumPrices = all.map(mapper).reduce(reducer, []);
  // console.log(sumPrices);

  const label = sumPrices.map(item => item && moment(`${item.year}-${item.month}`).format('YYYY-MMMM'))
  const dataChart = sumPrices.map(item =>item && item.price)

  return (
    <Modal size="xl" show={show} onHide={onhide}>
      <Modal.Body style={{ padding: '40px 10px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <table className="table">
                <tr>
                  <th>Profit per this month</th>
                  <td>: Rp. {total_profit}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-12 col-lg-4 col-sm-12">
              <Card img={linetoup} percent="0" title="PROFIT" angka={total_profit} />
            </div>
            <div className="col-md-12 col-lg-8 col-sm-12">
              <ChartLineSales label={label} data1={dataChart} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
