import React, { useContext, useEffect } from 'react'
import { Container } from '../../../component/element/Container'
import calender from '../../../image/icon/calendar-white.png'
import styled from 'styled-components'
import moment from 'moment'
import { ReadMore } from '../../../component/Readmore/ReadMore'
import { Context } from '../../../service/context/Context'

export const ListEvent = () => {
  const { arrEvent } = useContext(Context)
  console.log(arrEvent)
  return (
    <Container data-aos="fade-down" bgColor className="container-fluid" >
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <img src={calender} alt="Calender" /> Events - Historical Moments
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center align-items-center mt-5">
          {
            arrEvent.length > 0 ? arrEvent.filter(a => new Date(a.event_start_datetime).getTime() <= new Date().getTime()).map((item, index) => (
              <ContainerList className="col-lg-3 col-md-12 col-sm-12 m-2" key={index}>
                <div className="row">
                  <div className="col-md-12">
                    <Date1>{moment(item.event_start_datetime).format('dddd, DD MMMM YYYY')} s/d {moment(item.event_end_datetime).format('dddd, DD MMMM YYYY')} </Date1>
                  </div>
                  <Title className="col-md-12 col-sm-12">
                    {item.event_name}
                  </Title>
                  <Content className="col-md-12 col-sm-12">
                    {item.event_description.length > 200 ?
                      <ReadMore>
                        {item.event_description}
                      </ReadMore>
                      : item.event_description
                    }

                  </Content>
                </div>
              </ContainerList>

            ))
              : 'Nothing Event'
          }
        </div>

      </div>
    </Container>
  )
}

const Content = styled.div`
font-size: 9pt;
`

const Title = styled.div`
font-weight:700;
font-size: 18pt;
flex-wrap: wrap;
overflow: auto;

`


const Date1 = styled.div`
font-weight:600;
`


const ContainerList = styled.div`
background-color: #fff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius: 7px;
padding:15px 15px;
`
