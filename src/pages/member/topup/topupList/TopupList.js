import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { Button } from '../../../../component/element/Button'
import styled from 'styled-components'
import { DetailTopUp } from '../../../../component/modal/member/DetailTopUp'
import { Context } from '../../../../service/context/Context'
import { Pagination } from '../../../../component/pagination/Pagination'
import { currency } from '../../../../utl/Currency'

export const TopupList = () => {
  const [modalSeeDetail, setModalSeeDetail] = useState(false)
  const { apideposit, arrDeposit, max_pageDeposit } = useContext(Context)

  useEffect(() => {
    apideposit({ type: 'GET_DEPOSIT_LIST' })
    apideposit({ type: 'GET_DEPOSIT_ALL' })
  }, [])


  const btnShowModalSeeDetail = async ({ member_id }) => {
    await apideposit({ type: 'GET_DEPOSIT_DETAIL', id: member_id })
    await setModalSeeDetail(!modalSeeDetail)
  }

  const btnApprove = ({ deposit_id, command }) => {
    const data = {
      deposit_id: deposit_id,
      command: command
    }
    apideposit({ type: 'POST_DEPOSIT_PROCESS', data: data })

  }
  return (
    <>
      <div className="row p-5">
        {/* modal */}
        <DetailTopUp show={modalSeeDetail} onHide={() => setModalSeeDetail(!modalSeeDetail)} />
        <div className="col-md-12 col-lg-12 col-sm-12">
          Top Up List  : 5
        </div>
      </div>
      <div className="row mt-2">
        {/* <small>
          - list request member belum ada data <br />
          - history top up belum ada (hasil reject / success)
        </small> */}
        <Table responsive="xl" striped>
          <thead className="text-center">
            <tr>
              <th>MEMBER NAME</th>
              <th>TOP UP VALUE</th>
              <th>TOP UP DATE & TIME</th>
              <th>STATUS</th>
              <th>TOP UP DETAILS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              arrDeposit.length > 0 ? arrDeposit.map((item, index) => (
                <tr key={index}>
                  <td>{item.full_name}</td>
                  <td>{currency(item.deposit_amount)}</td>
                  <td>{moment(item.created_at).format('DD/MM/YYYY - HH.mm')}</td>
                  <td>{item.status}</td>
                  <td><Button onClick={() => btnShowModalSeeDetail({ member_id: item.id })}>See Details</Button></td>
                  <td>
                    {
                      item.status === 'paid' ?
                        <ContainerButton>
                          <Accept onClick={() => btnApprove({ deposit_id: item.id, command: 'approve' })}>Accept</Accept>
                          <Reject onClick={() => btnApprove({ deposit_id: item.id, command: 'reject' })}>Reject</Reject>
                        </ContainerButton>
                        : 'No Available'
                    }
                  </td>
                </tr>

              ))
                :
                <tr>
                  <td>{"Nothing Data"}</td>
                  <td>{"Nothing Data"}</td>
                  <td>{"Nothing Data"}</td>
                  <td>{"Nothing Data"}</td>
                  <td>{"Nothing Data"}</td>
                </tr>
            }
          </tbody>
        </Table>
      </div>
      <div className="row mt-4 text-end align-items-end justify-content-end">
        <div className="col-md-12 col-sm-12 co-lg-12 text-end">
          {/* <Pagination  totalPage={max_pageDeposit} /> */}
        </div>
      </div>
    </>
  )
}

const Accept = styled.div`
cursor:pointer;
color:#fff;
background:#FFBF00;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
`
const Reject = styled.div`
cursor:pointer;
color:#fff;
background:#EF4747;
padding:5px 10px;
margin:0px 10px;
border-radius:2px;
`

const ContainerButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
