import { methodGET, methodPostImage, methodPost } from "../../../method/method"
import swal from 'sweetalert'


export const ApiProduk = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })

  switch (action.type) {
    case 'POST_SOLD_BY_QUERY':
      loading(true)
      methodPost({ endpoint: `/product/soldByQuery`, data: action.data })
        .then(res => {
          console.log('POST_SOLD_BY_QUERY', res)
          dispatch({ type: 'ARR_PRODUK_SOLD_THIS_MONTH', arrProdukSoldThisMonth: res.success.data })
          loading(false)
        })
      break;
    case 'POST_ADD_PROMOTION':
      loading(true)
      methodPost({ endpoint: `/promotion/add`, data: action.data })
        .then(res => {
          console.log('post_add_promotion', res)
          if (res.success) {
            // alert(res.success)
            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/products/TotalProduct"
          }
          loading(false)
        })
      break;
    case 'POST_DELETE_PROMOTION':
      loading(true)
      methodPost({ endpoint: `/promotion/del`, data: action.data })
        .then(res => {
          console.log('POST_DELETE_PROMOTION', res)

          loading(false)
        })
      break;
    case 'POST_EDIT_PROMOTION':
      loading(true)
      methodPost({ endpoint: `/promotion/edit`, data: action.data })
        .then(res => {
          console.log('POST_EDIT_PROMOTION', res)

          loading(false)
        })
      break;
    case 'GET_PRODUCT_PROMOTION':
      loading(true)
      methodGET({ endpoint: `/product/promo/${action.page}` })
        .then(res => {
          if (res.success) {
            console.log('GET_PRODUCT_PROMOTION', res)
            dispatch({ type: 'ARR_PRODUK_PROMOSI', arrProdukPromosi: res.success })
          }
          else {
            // alert(`${res.error}`)

            dispatch({ type: 'ARR_PRODUK_PROMOSI', arrProdukPromosi: [] })
          }
          loading(false)
        })
      break;
    case 'SOLD_ALL':
      loading(true)
      methodGET({ endpoint: `/product/soldAll/${action.page}` })
        .then(res => {
          console.log('product_sold_all', res)
          dispatch({ type: 'ARR_PRODUK_SOLD', arrProdukSold: res.success })
          loading(false)
        })
      break;
    case 'EDIT_PRODUK':
      loading(true)
      methodPostImage({ endpoint: '/product/edit', data: action.data })
        .then(res => {
          console.log('EDIT_PRODUK', res)
          if (res) {
            if (res.success) {
              // dispatch({ type: 'ARR_PRODUK', arrProduk: res.success })
              // alert(`${res.success}`)

              swal("SUCCESS", `${res.success}`, "success");
              window.location.href = "/products/TotalProduct"
            }
            else {
              if (res.error) {
                if (res.error.product_id) {
                  alert(`${res.error.product_id.map(item => item)}`)
                }
                else if (res.error.product_price) {
                  alert(`${res.error.product_price.map(item => item)}`)
                }
                else if (res.error.selling_price) {
                  alert(`${res.error.selling_price.map(item => item)}`)
                }
              }
              else {
                alert(`${res}`)
              }
            }

          }
          else {

            alert(`${res}`)
          }

          loading(false)
        })
      break;
    case 'GET_PRODUK':
      loading(true)
      methodGET({ endpoint: '/product/all' })
        .then(res => {
          console.log('GET_PRODUK', res)
          if (res.success) {
            dispatch({ type: 'ARR_PRODUK', arrProduk: res.success.data })
          }
          else {
            dispatch({ type: 'ARR_PRODUK', arrProduk: [] })
          }
          loading(false)
        })
      break;
    case 'ADD_PRODUK':
      loading(true)
      methodPostImage({ endpoint: '/product/add', data: action.data })
        .then(res => {
          console.log(res)
          if (res.success) {
            // alert(`${res.success}`)

            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/products/TotalProduct"
          }
          else {
            alert(`${res.error}`)
          }
          loading(false)
        })
      break;

    default:
      alert('error api produk')
      break;
  }

}