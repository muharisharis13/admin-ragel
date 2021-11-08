import { methodGET, methodPostImage, methodPost } from "../../method/method"
import swal from 'sweetalert'


export const ApiDeposit = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })
  let arrDeposit = ({ data, max_page }) => dispatch({ type: 'SET_DEPOSIT', arrDeposit: data, max_pageDeposit: max_page })
  let dataDepositDetail = ({ dataDepositDetail }) => dispatch({ type: 'SET_DEPOSIT_DETAIL', dataDepositDetail: dataDepositDetail })
  let arrDepositAll = ({ data, max_page }) => dispatch({ type: 'SET_DEPOSIT_ALL', arrDepositAll: data, max_pageDepositAll: max_page })

  switch (action.type) {

    case 'GET_DEPOSIT_ALL':
      loading(true)
      methodGET({ endpoint: `/deposit/all` })
        .then(res => {
          console.log('GET_DEPOSIT_ALL', res)
          if (res.success) {
            arrDepositAll({ data: res.success.data, max_page: res.success.max_page })
          }

          loading(false)
        })
      break;
    case 'GET_DEPOSIT_LIST':
      loading(true)
      methodGET({ endpoint: `/deposit/depoList` })
        .then(res => {
          console.log('GET_DEPOSIT_LIST', res)
          if (res.success) {
            arrDeposit({ data: res.success.data, max_page: res.success.max_page })
          }
          loading(false)
        })
      break;
    case 'GET_DEPOSIT_DETAIL':
      loading(true)
      methodGET({ endpoint: `/deposit/detailDepo/${action.id}` })
        .then(res => {
          console.log('GET_DEPOSIT_DETAIL', res)
          if (res.success) {
            dataDepositDetail({ dataDepositDetail: res.success.deposit_history })
          }
          loading(false)
        })
      break;
    case 'POST_DEPOSIT_PROCESS':
      loading(true)
      methodPost({ endpoint: `/deposit/process`, data: action.data })
        .then(res => {
          console.log('POST_DEPOSIT_PROCESS', res)
          if (res.success) {
            // alert(`${res.success}`)
            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/memberTopup"
          }
          // else {
          //   alert("error POST_DEPOSIT_PROCESS")
          // }
          loading(false)
        })
      break;

    default:
      // alert('error api deposit')
      break;
  }

}