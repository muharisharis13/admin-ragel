import React from 'react'
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components'
import { Button, LinkButton } from '../../element/Button';

export const VerticalChartSales = ({ angkaTitle = 99,
label = ['1', '2', '3', '4', '5', '6', '7', '8'],
data1 = [12, 19, 3, 5, 2, 3, 2, 3]

}) => {



  const data = {
    labels: label,
    datasets: [
      {
        label: `Monthly Product Sold`,
        data: data1,
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
          Total Prodcuct Sold
        </Overview>
        <Title className="col-sm-7">
          {angkaTitle}
        </Title>
        <div className="col-sm-5">
          <LinkButton to="/products/TotalProductSold">
            <Button>See Details</Button>
          </LinkButton>
        </div>
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
font-size: 16pt;
`
