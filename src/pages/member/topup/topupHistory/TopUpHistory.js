import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { Button } from '../../../../component/element/Button'
import styled from 'styled-components'
import { DetailTopUp } from '../../../../component/modal/member/DetailTopUp'
import { Pagination } from '../../../../component/pagination/Pagination'
import { Context } from '../../../../service/context/Context'
import { currency } from '../../../../utl/Currency'
import { methodGET } from '../../../../service/method/method'

export const TopUpHistory = () => {
  const [modalSeeDetail, setModalSeeDetail] = useState(false)
  const { apideposit, arrDepositAll, max_pageDepositAll, dispatch } = useContext(Context)
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })
  let arrDepositAll1 = ({ data, max_page }) => dispatch({ type: 'SET_DEPOSIT_ALL', arrDepositAll: data, max_pageDepositAll: max_page })


  useEffect(() => {
    apideposit({ type: 'GET_DEPOSIT_ALL' })
  }, [])

  const btnShowModalSeeDetail = async ({ member_id }) => {

    await apideposit({ type: 'GET_DEPOSIT_DETAIL', id: member_id })
    await setModalSeeDetail(!modalSeeDetail)
  }

  const btnPagination = async (page) => {
    loading(true)
    methodGET({ endpoint: `/deposit/all?page=${page}` })
      .then(res => {
        console.log('GET_DEPOSIT_ALL', res)
        if (res.success) {
          arrDepositAll1({ data: res.success.data, max_page: res.success.max_page })
        }

        loading(false)
      })
  }

  return (
    <>
      <DetailTopUp show={modalSeeDetail} onHide={() => setModalSeeDetail(!modalSeeDetail)} />
      <div className="row mt-2">
        <Table responsive="xl" striped>
          <thead className="text-center">
            <tr>
              <th>MEMBER NAME</th>
              <th>TOP UP VALUE</th>
              <th>TOP UP DATE & TIME</th>
              <th>TOP UP DETAILS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              arrDepositAll.length > 0 ? arrDepositAll.map((item, index) => (
                <tr key={index}>
                  <td>{item.full_name}</td>
                  <td>{currency(item.deposit_amount)}</td>
                  <td>{moment(item.created_at).format('DD/MM/YYYY - HH.mm')}</td>
                  <td><Button onClick={() => btnShowModalSeeDetail({ member_id: item.id })}>See Details</Button></td>
                  <td>
                    <ContainerButton>
                      <>{item.status}</>
                    </ContainerButton>
                  </td>
                </tr>
              ))
                :
                <tr>
                  <td>"nothing data"</td>
                  <td>"nothing data"</td>
                  <td>"nothing data"</td>
                  <td>"nothing data"</td>
                  <td>"nothing data"</td>
                </tr>
            }

          </tbody>
        </Table>
      </div>
      <div className="row justify-content-center align-items-center text-center mt-2">
        <div className="col-md-12 col-sm-12 col-lg-12">
          <Pagination totalPage={max_pageDepositAll} btnPage={(page) => btnPagination(page)} />
        </div>
      </div>
    </>
  )
}



const ContainerButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
