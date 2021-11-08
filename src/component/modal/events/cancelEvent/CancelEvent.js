import React, { useEffect, useState, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import { Button } from '../../../element/Button'
import { Context } from '../../../../service/context/Context'

export const CancelEvent = ({ show, onHide, data }) => {
  const [dataModal, setDataModal] = useState({
    start: new Date(),
    end: new Date(),
    event_name: '',
    event_desc: '',
    id: ''
  })
  const { apievent } = useContext(Context)


  useEffect(() => {
    if (data.length > 0) {
      setDataModal({
        ...dataModal,
        start: data.length > 0 ? new Date(data[0].event_start_datetime) : new Date(),
        end: data.length > 0 ? new Date(data[0].event_end_datetime) : new Date(),
        event_name: data[0].event_name,
        event_desc: data[0].event_description,
        id: data[0].id
      })
    }
  }, [data])


  const btnCancel = () => {
    if (window.confirm('Are You Sure To Cancel ?')) {
      apievent({ type: 'POST_DELETE_EVENT', data: { event_id: dataModal.id } })
      onHide()
    }
    else {
      onHide()
    }
  }


  return (
    <Modal size="lg" show={show} onHide={onHide}>
      {
        console.log('ini event  : ', data)
      }
      <Modal.Header>
        <Title>
          Event
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
                    selected={dataModal.start}
                    className="form-control"
                    dateFormat="dd MMMM yyyy"
                  />
                </div>
                <div className="col-md-6">
                  <div>End Date</div>
                  <PickerDate
                    selected={dataModal.end}
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
                  <input type="text" placeholder="Event Name" id="event_name" className="form-control" value={dataModal.event_name} />
                </div>
                <div className="col-md-12 col-sm-12 mt-1">
                  <label htmlFor="event_desc">Event Description</label>
                  <TextDesc name="event_desc" id="event_desc" cols="30" placeholder="Event Description" rows="7" className="form-control" value={dataModal.event_desc} />
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-lg-3 col-md-10 col-sm-10">
              <Button onClick={btnCancel}>Cancel Event</Button>
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
