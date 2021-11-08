import { Modal } from 'react-bootstrap'
import React, { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import moment from 'moment'
import styled from 'styled-components'
import { Context } from '../../../service/context/Context'
import { currency } from '../../../utl/Currency'

export const DetailTopUp = ({ onHide, data, show }) => {
  const { dataDepositDetail } = useContext(Context)

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header>
        <FaTimes cursor="pointer" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-6">
              <Div>Top up by : {dataDepositDetail.pay_gate_name}</Div>
              <Div>Top up value : <strong> {currency(dataDepositDetail.payment_amount)}</strong></Div>
              <Div>Top up date & time : {moment(dataDepositDetail.created_at).format('DD/MM/YYYY - HH.mm')} </Div>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-6">
              <div>Trasnfer Receipt</div>
              <div>
                <img width={400} src={dataDepositDetail.proof_url} alt="receipt" />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}


const Div = styled.div`
padding:10px 0px
`
