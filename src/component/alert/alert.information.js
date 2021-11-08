import React from 'react'
import { Modal } from 'react-bootstrap'

export const AlertInformation = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body></Modal.Body>
    </Modal>
  )
}
