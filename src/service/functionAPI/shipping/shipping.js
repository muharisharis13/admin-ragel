import { methodGET, methodPostImage, methodPost } from "../../method/method"
import swal from 'sweetalert'

export const ApiShipping = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })

  switch (action.type) {
    case 'POST_ADD_NEW_SHIPPING_METHOD':
      loading(true)
      methodPost({ endpoint: `/shipping/addNewShip`, data: action.data })
        .then(async res => {
          console.log('POST_ADD_NEW_SHIPPING', res)
          if (res.success) {
            // alert(`${res.success}`)

            await swal("SUCCESS", `${res.success}`, "success");
          }
          else {
            alert('error post shipping')
          }
          loading(false)
        })
      break;
    case 'POST_EDIT_SHIPPING_METHOD':
      loading(true)
      methodPost({ endpoint: `/shipping/editShip`, data: action.data })
        .then(async res => {
          console.log('POST_EDIT_SHIPPING', res)
          if (res.success) {
            // alert(`${res.success}`)

            await swal("SUCCESS", `${res.success}`, "success");
            await window.location.reload()
          } else {
            alert('error edit shipping')
          }
          loading(false)
        })
      break;
    case 'GET_SHIPPING':
      loading(true)
      methodGET({ endpoint: `/shipping/getShip?page=${action.page}` })
        .then(res => {
          console.log('GET_SHIPPING', res)
          if (res.success) {
            dispatch({ type: 'SET_SHIPPING', arrShipping: res.success.data, max_pageShipping: res.success.max_page, pageShipping: res.success.page })
          }
          else {
            alert('error get shipping')

          }
          loading(false)
        })
      break;
    default:
      alert('error api produk')
      break;
  }

}