import React, { useState, useEffect, useContext } from 'react'
import { Container } from '../../../../component/element/Container'
import styled from 'styled-components'
import { Button, LinkButton } from '../../../../component/element/Button'
import { Downliner } from '../../../../component/modal/member/Downliner'
import { ProfitThisMonth } from '../../../../component/modal/member/ProfitThisMonth'
import { SoldThisMonth } from '../../../../component/modal/member/SoldThisMonth'
import { Context } from '../../../../service/context/Context'
import { isElementOfType } from 'react-dom/test-utils'

export const MemberDetail = (props) => {
  const p = props.location.state
  const [modal, setModal] = useState({
    downline: false,
    profit: false,
    sold: false
  })
  const [user_data, setUser_data] = useState({})
  const [data, setData] = useState({
    sold_product: ''
  })
  const { apimember, arrMemberDetails1st, arrMemberDetails2nd } = useContext(Context)
  const [dataModal, setDataModal] = useState([])
  console.log('ini p', p)


  useEffect(() => {
    if (p) {
      setUser_data(p.user_data)
      setData({ ...data, sold_product: p.sold_product })
      apimember({ type: 'GET_MEMBER_DETAIL_1ST', id: p.user_data.member_id })
      apimember({ type: 'GET_MEMBER_DETAIL_2ND', id: p.user_data.member_id })
      apimember({ type: 'GET_MEMBER_PROFIT_BY_ID', member_id: p.user_data.member_id })
      apimember({ type: 'GET_MEMBER_SOLD_BY_ID', member_id: p.user_data.member_id })
    }
    else {
      window.location.href = "/member"
    }
  }, [])




  const btnDetails1st = async ({ type }) => {
    if (type === "arrMemberDetails1st") {
      setDataModal(arrMemberDetails1st)
    }
    else if (type === "arrMemberDetails2nd") {
      setDataModal(arrMemberDetails2nd)
    }
    await setModal({ ...modal, downline: !modal.downline })
  }

  const btnModalProfit = () => {
    setModal({ ...modal, profit: !modal.profit })
  }


  // console.log('user_data', user_data)
  return (
    <Container data-aos="fade down" className="container-fluid" bgColor>
      <div className="container">
        <ContainerWrapper className="row mt-5">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-md-12 col-lg-4 col-sm-12">
                <table className="table">
                  <tr>
                    <th>Full Name</th>
                    <td>: {user_data.full_name}</td>
                  </tr>
                  <tr>
                    <th>RBO</th>
                    <td>: {user_data.partner_id}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>: {user_data.email}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>: {user_data.account_status}</td>
                  </tr>
                  <tr>
                    <th>Verify Status</th>
                    <td>: {user_data.verified_status}</td>

                  </tr>
                </table>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12">
                <img src={user_data.ktp_url ? user_data.ktp_url : "https://asset.kompas.com/crops/WqD0K4htkHFLc6Y4lxRzxolnYZ8=/0x0:0x0/750x500/data/photo/2020/05/05/5eb150f612742.jpg"} alt="ktp" width={300} />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <table className="table">
                  <tr>
                    <th>Downliner 1St Line</th>
                    <td>: {user_data.downline_1stline}</td>
                    <td>
                      {/* <Button onClick={()=>btnDetails1st(user_data.member_id)}>See Details</Button> */}
                      <LinkButton>
                        <Button onClick={() => btnDetails1st({ type: 'arrMemberDetails1st' })}>See Details</Button>
                      </LinkButton>
                      <Downliner data={dataModal} show={modal.downline} onhide={() => setModal({ ...modal, downline: !modal.downline })} />
                    </td>
                  </tr>
                  <tr>
                    <th>Downliner 2St Line</th>
                    <td>: {user_data.downline_2ndline}</td>
                    <td>
                      <LinkButton>
                        <Button onClick={() => btnDetails1st({ type: 'arrMemberDetails2nd' })}>See Details</Button>
                      </LinkButton>
                    </td>
                  </tr>
                  <tr>
                    <th>Profit per this month</th>
                    <td>: Rp. {user_data.total_profit}</td>
                    <td>
                      <LinkButton>
                        <Button onClick={() => btnModalProfit()}>See Details</Button>
                        <ProfitThisMonth total_profit={user_data.total_profit} show={modal.profit} onhide={() => setModal({ ...modal, profit: !modal.profit })} />
                      </LinkButton>
                    </td>
                  </tr>
                  <tr>
                    <th>Product Sold per this month</th>
                    <td>: {data.sold_product}</td>
                    <td>
                      <LinkButton>
                        <Button onClick={() => setModal({ ...modal, sold: !modal.sold })}>See Details</Button>
                        {/* modal */}
                        <SoldThisMonth data={p} show={modal.sold} onhide={() => setModal({ ...modal, sold: !modal.sold })} />
                      </LinkButton>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </ContainerWrapper>

      </div>
    </Container>
  )
}


const ContainerWrapper = styled.div`
background: #fff;
padding:10px;
`