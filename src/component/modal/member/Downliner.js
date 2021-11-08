import moment from 'moment'
import React, { useContext } from 'react'
import { Modal, Table } from 'react-bootstrap'
import { Context } from '../../../service/context/Context'
import { Button } from '../../element/Button'

export const Downliner = ({ show, onhide, data = [] }) => {


  // console.log('data', data)
  return (
    <Modal size="lg" show={show} onHide={onhide}>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              Downliner 1St : {data.length}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-12">
              <Table responsive striped hover>
                <thead style={{ textAlign: 'center' }}>
                  <tr>
                    <th>MEMBER'S NAME</th>
                    <th>RBO</th>
                    <th>DATE BIRTH</th>
                    <th>DATE JOIN</th>
                    <th>DOWNLINER</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    data.length > 0 ? data.map((item, index) => (
                      <tr key={index}>
                        <th>{item.full_name}</th>
                        <td>{item.partner_id}</td>
                        <td>{moment(item.birth_date).format('DD/MM/YYYY')}</td>
                        <td>{moment(item.created_at).format('DD/MM/YYYY - hh.mm.ss')}</td>
                        <td>{item.downliner_list}</td>
                        <td>
                          {/* <Button>See Details</Button> */}
                          {item.verified_status}
                        </td>
                      </tr>

                    ))
                      : 'nothing data'
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
