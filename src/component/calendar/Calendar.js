import React, { useState } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components'

export const Calendar = ({ arrayEvent }) => {

  return (
    <Container>
      <div>Event Calendar</div>
      <DayPicker
        selectedDays={arrayEvent}
      />
    </Container>
  )
}

const Container = styled.div`
background:#fff;
display: flex !important;
align-items: center;
justify-content: center;
border-radius:7px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.5);
flex-direction: column;
padding:10px !important;
`
