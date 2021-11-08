import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components'
import { methodGET } from '../../service/method/method';
import { Button, LinkButton } from '../element/Button';

export const VerticalChart = () => {
  const [prductName, setProductname] = useState([])
  const [Sold, setSold] = useState([])

  useEffect(() => {
    methodGET({ endpoint: `/product/soldAll/1` })
      .then(res => {
        console.log(res.success)

        setProductname(res.success.slice(0, 5).map(item => item.product_name))
        setSold(res.success.slice(0, 5).map(item => item.sold))
      })
  }, [])

  const data = {
    labels: prductName,
    datasets: [
      {
        label: `Sales Profit`,
        data: Sold,
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
          Performance
        </Overview>
        <Title className="col-sm-7">
          Monthly Product Sold
        </Title>
        {/* <div className="col-sm-5">
          <LinkButton to="/products/TotalProductSold">
          <Button>See Details</Button>
          </LinkButton>
        </div> */}
      </div>
      <Bar data={data} options={options} />

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
font-size: 12pt;
`
