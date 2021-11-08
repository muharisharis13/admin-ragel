import React, { useEffect, useContext } from 'react'
import { Card } from '../../../component/card/Card'
import { Container } from '../../../component/element/Container'
import { Search } from '../../../component/search/search'
import { Table } from 'react-bootstrap'
import moment from 'moment'
import { Button, LinkButton } from '../../../component/element/Button'
import { Pagination } from '../../../component/pagination/Pagination'
import styled from 'styled-components'
import arrowup from '../../../image/icon/arrowup.png'
import { Context } from '../../../service/context/Context'

export const Member = () => {
  const { apimember, arrMember, max_pageMember } = useContext(Context)

  useEffect(() => {
    apimember({ type: 'GET_MEMBER' })
  }, [])

  const btnPage = (page) => {
    apimember({ type: 'GET_MEMBER', page: page })
  }

  return (
    <Container bgColor data-aos="fade-down" className="container-fluid">

      {/* <div className="row">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <Card
            title="NEW MEMBERS"
            since={true}
            img={arrowup}
            angka={20}
          />
        </div>
      </div> */}

      <div className="row mt-5">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <Search />
        </div>
      </div>

      <div className="container mt-5" style={{ background: '#fff', padding: '20px 0px' }}>
        <div className="row" >
          <div className="col-md-12 col-sm-12 col-lg-12">
            <ContainerMember>
              <div>Total Members : {arrMember.length}</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>Active Members : {`688`}</div>

            </ContainerMember>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 mt-3">
            {/* <small>
              - ragel deposit belum <br />
              - downliner belum <br />
              - max page belum <br />
              - see detail api belum ada, masih ribet untuk join <br />
              - search belum
            </small> */}
            <Table striped hover responsive className="table">
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>MEMBER'S NAME</th>
                  <th>RAGEL DEPOSIT</th>
                  <th>RBO</th>
                  <th>DATE OF BIRTH</th>
                  <th>DATE JOINED</th>
                  <th>DOWNLINER 1 ST</th>
                  <th>DOWNLINER 2 ND</th>
                  <th>UPLINER</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                {
                  arrMember.length > 0 ? arrMember.map((item, index) => (
                    item.user_data ?
                      <tr key={index}>
                        <th>{item.user_data.full_name}</th>
                        <th>Rp. {item.user_data.balance}</th>
                        <td>{item.user_data.partner_id}</td>
                        <td>{moment(item.user_data.birth_date).format('DD/MM/YYYY')}</td>
                        <td>{moment(item.user_data.created_at).format('DD/MM/YYYY - hh.mm.ss')}</td>
                        <td>{item.user_data.downline_1stline}</td>
                        <td>{item.user_data.downline_2ndline}</td>
                        <td>{item.user_data.upline ? item.user_data.upline : 'Tidak Ada Upline'}</td>
                        <td>
                          <LinkButton to={{ pathname: `/members/detail/${index}`, state: arrMember[index] }}>
                            <Button>See Details</Button>
                          </LinkButton>
                        </td>
                      </tr>
                      : null
                  ))
                    :
                    <tr>
                      <th>-</th>
                      <th>-</th>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        -
                      </td>
                    </tr>
                }

              </tbody>
            </Table>
          </div>
        </div>

        <div className="row mt-4 text-end align-items-end justify-content-end">
          <div className="col-md-12 col-sm-12 co-lg-12 text-end">
            <Pagination totalPage={max_pageMember} btnPage={(page) => btnPage(page)} />
          </div>
        </div>

      </div>
    </Container>
  )
}

const ContainerMember = styled.div`
display: flex;
padding:0px 20px;
`
