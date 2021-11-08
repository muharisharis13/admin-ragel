import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { Context } from '../../../../service/context/Context'
import { methodPost } from '../../../../service/method/method'
import swal from 'sweetalert';


export const ModalSeeDetail = ({ show = true, onHide, data }) => {
  const { dispatch } = useContext(Context)
  const loading = (props) => dispatch({ type: 'LOADING', loading: props })


  const btnApproveAndReject = (type) => {
    loading(true)
    methodPost({ endpoint: `/member/${type}`, data: { member_id: data.member_id } })
      .then(async res => {
        console.log(res)
        if (type === 'verif') {
          // alert("sukses Verify Akun")

          await swal("INFO", `sukses Verify Akun`, "info");
        }
        else {
          await swal("INFO", `Sukses Reject Akun`, "info");
          // alert('Sukses Reject Akun')
        }
        window.location.reload()
        loading(false)
      })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <FaTimes cursor="pointer" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <h4>Detail Request</h4>
          <div className="row mt-4">
            <div className="col-md-12 col-sm-12 col-lg-12 mb-3">
              <strong>User Info</strong>
              <table className="mt-2">
                <tbody>
                  <tr>
                    <th>Full Name</th>
                    <td>: {data.full_name}</td>
                  </tr>
                  <tr>
                    <th>NIK</th>
                    <td>: {data.no_ktp}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>: {data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>: {data.phone_number}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>: {data.address}</td>
                  </tr>
                  <tr>
                    <th>Jobs</th>
                    <td>: {data.jobs}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-12 text-center mb-3">
              <Img src={data.ktp_url} width={250} alt="" />
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <Approve className="btn" onClick={() => btnApproveAndReject('verif')}>Approve</Approve>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <Reject className="btn" onClick={() => btnApproveAndReject('reject')}>Reject</Reject>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const Reject = styled.div`
display: flex;
background:transparent;
border:1px solid #ff0000;
align-items: center;
font-weight:600;
transition: 450ms;
justify-content: center;

&:hover{
  background:#ff0000;
  color:#fff;
}
`
const Approve = styled.div`
display: flex;
background:transparent;
border:1px solid #FFBF00;
align-items: center;
font-weight:600;
transition: 450ms;
justify-content: center;

&:hover{
  background:#FFBF00;
  color:#fff;
}
`

const Img = styled.img`
object-fit: contain;
`
