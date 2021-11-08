import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import { Context } from '../../../service/context/Context'
import { Button } from '../../element/Button'

export const AddEvents = ({ show, onhide }) => {
  const { apievent } = useContext(Context)
  const [data, setdata] = useState({
    start: new Date(),
    end: new Date(),
    time: '',
    event_name: '',
    event_description: ''
  })

  const onChangeValue = (e, type) => {
    switch (type) {
      case 'start':
        setdata({ ...data, start: new Date(e) })
        break;
      case 'end':
        setdata({ ...data, end: new Date(e) })
        break;
      case 'event_name':
        setdata({ ...data, event_name: e.target.value })
        break;
      case 'event_description':
        setdata({ ...data, event_description: e.target.value })
        break;

      default:
        break;
    }
  }

  const BtnAddEvent = () => {
    apievent({
      type: 'POST_ADD_EVENT', data: {
        event_description: data.event_description,
        event_name: data.event_name,
        event_start_datetime: moment(data.start).format('YYYY-MM-DD'),
        event_end_datetime: moment(data.end).format('YYYY-MM-DD')
      }
    })
    onhide()
  }


  return (
    <Modal size="lg" show={show} onHide={onhide} >
      <Modal.Header>
        <Title>
          Add New Event
        </Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div>Start Date</div>
                  <PickerDate
                    selected={data.start} onChange={(e) => onChangeValue(e, 'start')}
                    className="form-control"
                    dateFormat="dd MMMM yyyy"
                  />
                </div>
                <div className="col-md-6">
                  <div>End Date</div>
                  <PickerDate
                    selected={data.end} onChange={(e) => onChangeValue(e, 'end')}
                    className="form-control"
                    dateFormat="dd MMMM yyyy"
                  />

                </div>
                {/* <div className="col-md-5 col-sm-12 mt-2">
                  <div>Set Time</div>
                  <Jam type="time" className="form-control" value={moment(new Date()).format('hh:mm')} />
                </div> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label htmlFor="event_name">Event Name</label>
                  <input type="text" placeholder="Event Name" id="event_name" className="form-control"
                    value={data.event_name} onChange={(e) => onChangeValue(e, `event_name`)}
                  />
                </div>
                <div className="col-md-12 col-sm-12 mt-1">
                  <label htmlFor="event_desc">Event Description</label>
                  <TextDesc name="event_desc" id="event_desc" cols="30" placeholder="Event Description" rows="7" className="form-control"
                    value={data.event_description} onChange={(e) => onChangeValue(e, `event_description`)}
                  ></TextDesc>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-lg-3 col-md-10 col-sm-10">
              <Button onClick={BtnAddEvent}>Publish Event</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const Title = styled.div`
font-weight: 700;
font-size: 15pt;
`

const TextDesc = styled.textarea`
resize:none;
`

const Jam = styled.input`
text-align: center;
cursor: pointer;
`

const PickerDate = styled(DatePicker)`
cursor: pointer;
text-align: center;
`