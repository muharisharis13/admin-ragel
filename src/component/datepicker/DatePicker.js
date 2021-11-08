import React from 'react'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'


export const DatePicker2 = ({ start, end, onChangeStart, onChangeEnd }) => {
  return (
    <div className="row justify-content-center align-items-center text-center">
      <div className="col-md-2 col-sm-12 mt-2">
        Filter by
      </div>
      <div className="col-md-5 col-sm-12 mt-2">
        <DateStart
          className="form-control"
          selected={start}
          dateFormat="dd MMMM yyyy"
          onChange={onChangeStart}

        />
      </div>
      <div className="col-md-5 col-sm-12 mt-2">
        <DateEnd
          className="form-control"
          selected={end}
          dateFormat="dd MMMM yyyy"
          onChange={onChangeEnd}
        />
      </div>
    </div>
  )
}

const DateStart = styled(DatePicker)`
cursor:pointer;
`
const DateEnd = styled(DatePicker)`
cursor:pointer;
`
