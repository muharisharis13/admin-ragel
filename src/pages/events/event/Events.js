import React, { useState, useContext, useEffect } from 'react'
import { Container } from '../../../component/element/Container'
import calender from '../../../image/icon/calendar-white.png'
import Clock from "../../../image/icon/clock-rounded.png"
import styled from 'styled-components'
import { A, Button, LinkButton } from '../../../component/element/Button'
import { Calendar } from '../../../component/calendar/Calendar'
import { FaPencilAlt } from 'react-icons/fa'
import moment from 'moment'
import { ReadMore } from '../../../component/Readmore/ReadMore'
import { Link } from 'react-router-dom'
import { AddEvents } from '../../../component/modal/events/addEvents'
import { CancelEvent } from '../../../component/modal/events/cancelEvent/CancelEvent'
import { Context } from '../../../service/context/Context'

export const Events = () => {
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [viewEvent, setViewEvent] = useState(false)
  const { apievent, arrEvent } = useContext(Context)
  const [arrayDateEvent, setArrayDateEvent] = useState([])
  const [indexEvent, setIndexEvent] = useState(0)

  useEffect(() => {
    apievent({ type: 'GET_ALL_EVENT' })
    setArrayDateEvent([])
  }, [])
  useEffect(() => {
    arrEvent.forEach((item) => {
      if (item.hasOwnProperty('event_start_datetime')) {
        arrayDateEvent.push(item['event_start_datetime'])
      }
    })
  }, [arrEvent])

  const onChangeAddEventShow = () => setShowAddEvent(!showAddEvent)

  const onChangeViewEventShow = (index) => {
    setViewEvent(!viewEvent)
    setIndexEvent(index)
  }

  return (
    <Container data-aos="fade-down" bgColor className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <img src={calender} alt="Calender" /> Events
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <ContainerCard1>
            <ContainerCard>
              <div>
                <Title>Historical Moments</Title>
                <Angka>{arrEvent.filter(a => new Date(a.event_start_datetime).getTime() <= new Date().getTime()).length} &nbsp;<Moments>moments</Moments> </Angka>
              </div>
              <div>
                <img src={Clock} alt="img" width={40} />
              </div>
            </ContainerCard>
            <div className="mt-4">
              <LinkButton to="/events/listEvent">
                <Button>See Details</Button>

              </LinkButton>
            </div>

          </ContainerCard1>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <Calendar arrayEvent={arrayDateEvent.filter(a => new Date(a).getTime() >= new Date().getTime()).map(item => new Date(item))} />
            </div>
            <div className="col-sm-12">
              <div className="row mt-4">
                <div className="col-lg-12 col-md-12 col-md-12">
                  <ButtonAddEvent onClick={onChangeAddEventShow}>Add Event</ButtonAddEvent>
                  <AddEvents
                    show={showAddEvent}
                    onhide={onChangeAddEventShow}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Div className="col-lg-9 col-md-12 col-sm-12 ">
          <div className="row" >
            {
              arrEvent.length > 0 ? arrEvent.filter(a => new Date(a.event_start_datetime).getTime() >= new Date().getTime()).map((item, index) => (
                <div className="col-md-12 col-sm-12 col-lg-6 " key={index}>
                  <ContainerListevent className={index === 0 ? 'container mt-1 mb-1' : 'container mt-1 mb-1'} >
                    <div className="row justify-content-between align-items-center">
                      <Date1 className="col-md-12 col-sm-12">
                        {
                          moment(item.event_start_datetime).format('ddd , DD MMMM yyyy')
                        } &nbsp; &nbsp; s/d &nbsp;&nbsp;
                        {
                          moment(item.event_end_datetime).format('ddd , DD MMMM yyyy')
                        }
                      </Date1>
                      <div className="col-md-12 col-sm-12">
                        <div className="row">
                          <TitleEvent className="col-md-12 col-sm-12">
                            {item.event_name}
                          </TitleEvent>
                          <DescEvent className="col-md-9 col-sm-12">
                            {
                              item.event_description.length > 100 ?
                                <ReadMore>
                                  {item.event_description}
                                </ReadMore>
                                : item.event_description
                            }
                          </DescEvent>
                          <IconEvent className="col-md-3 col-sm-12" onClick={() => onChangeViewEventShow(item.id)}>
                            <FaPencilAlt cursor="pointer" />
                          </IconEvent>

                        </div>
                      </div>
                    </div>
                  </ContainerListevent>

                </div>
              ))
                : 'nothing event'
            }

          </div>
        </Div>
        <CancelEvent
          show={viewEvent}
          onHide={onChangeViewEventShow}
          data={arrEvent ? arrEvent.filter(a => a.id === indexEvent) : []}
        />
      </div>


    </Container>
  )
}

const Div = styled.div`

@media only screen and (min-width : 320px) and (max-width : 425px){
  margin-top:20px;
} 
`

const IconEvent = styled.div`
font-size:12pt;
display: inline-flex;
align-items: center;
justify-content: center;
`

const ButtonAddEvent = styled(Link)`
background:#FFBF00;
color:#fff;
border:none;
display: flex;
align-items: center;
justify-content: center;
padding:7px 0px;
border-radius:7px;
cursor:pointer;
font-weight:700;
text-decoration: none;
transition:850ms;

&:hover{
  color:#fff;
  background:#FFD558;
}
`

const DescEvent = styled.div`
text-align: justify;
`

const TitleEvent = styled.div`
font-size: 20pt;
font-weight:800;
`

const Date1 = styled.div`
font-weight:700;
`

const ContainerListevent = styled.div`
background: #fff;
border-radius:7px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
padding:15px 15px;
`

const Moments = styled.span`
font-size:9pt;
font-weight:normal;
`

const Angka = styled.div`
font-size:15pt;
color:#8898AA;
font-weight:700;
`

const Title = styled.div`
text-transform: uppercase;
font-size:9pt;
color:#8898AA;
font-weight: normal;
`

const ContainerCard1 = styled.div`
background-color: #fff;
display:flex;
flex-direction: column;

box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
border-radius:7px;
padding:15px 15px;
`

const ContainerCard = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
`
