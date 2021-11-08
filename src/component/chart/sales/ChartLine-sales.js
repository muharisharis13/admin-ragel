import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components'
import { methodPost } from '../../../service/method/method';
import { Button } from '../../element/Button';

export const ChartLineSales = ({
  label = ['1', '2', '3', '4', '5', '6', '7', '8'],
  data1 = [12, 19, 3, 5, 2, 3, 2, 3]
}) => {

  const [month, setMonth] = useState([])
  const [total_product, seTotal_product] = useState([])

  useEffect(() => {
    // methodGET({ endpoint: `/product/soldAll/1` })
    methodPost({ endpoint: `/product/soldByQuery`, data: { command: "week" } })
      .then(res => {
        console.log(res.success.data)
        setMonth(res.success.data.map(item => item.query))
        seTotal_product(res.success.data.map(item => item.total_product))
      })
  }, [])



  const data = {
    labels: month,
    datasets: [
      {
        label: `Sales Profit`,
        data: total_product,
        fill: false,
        backgroundColor: 'rgb(255, 191, 0)',
        borderColor: 'rgba(255, 230, 154, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Container >
      <div className="row">
        <Overview className="col-sm-12">
          Monthly profit
        </Overview>
        {/* <Title className="col-sm-9">
          {'Rp. 888.000'}
        </Title> */}
      </div>
      <Line data={data} options={options} />

    </Container>
  )
}

const Container = styled.div`
 background-color: #fff;
 padding:10px;
 border-radius:7px;
 
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
`

const Overview = styled.div`
font-weight:normal;
`

const Title = styled.div`
font-weight:bold;
font-size: 15pt;
`
