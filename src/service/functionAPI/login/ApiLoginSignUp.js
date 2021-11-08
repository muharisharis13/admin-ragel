import { methodGET, methodPost } from "../../method/method";
import { Redirect } from 'react-router-dom'
import { setCookies } from "../../cookies/Cookies";
import swal from 'sweetalert'

export const ApiLoginSignUp = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })
  let redirectPage = (props) => dispatch({ type: 'REDIRECT', redirect: props })

  switch (action.type) {
    case 'REGISTER':
      loading(true)
      redirectPage(false)
      methodPost({ endpoint: '/signup', data: action.data })
        .then(res => {
          console.log(res)

          if (res.success) {
            // alert(`${res.success.message}  ${res.success.email}`)

            swal("SUCCESS", `${res.success.message}  ${res.success.email}`, "success");
            window.location.href = "/login"
          }
          else if (res.error) {
            if (res.error.email) {
              alert(`${res.error.email[0]}`)

            }
            else if (res.error.contact_ig) {
              alert(`${res.error.contact_ig[0]}`)
            }
            else if (res.error.contact_tele) {
              alert(`${res.error.contact_tele[0]}`)
            }
            else if (res.error.contact_wa) {
              alert(`${res.error.contact_wa[0]}`)
            }
            else if (res.error.phone_number) {
              alert(`${res.error.phone_number[0]}`)
            }
          }

          loading(false)
        })
      break;
    case 'LOGIN':
      loading(true)
      methodPost({ endpoint: '/login', data: action.data })
        .then(res => {
          console.log(res)
          if (res.success) {
            // alert('login success')
            setCookies({ key: 'token', value: res.success.token })
            redirectPage(true)
          }
          else {
            alert(res.error)
          }
          loading(false)
        })
      break;
    case 'GET_INFO':
      loading(true)
      methodGET({ endpoint: '/account/info' })
        .then(res => {

          console.log('GET_INFO', res)
          if (res.success) {
            dispatch({ type: 'SET_INFO', arrInfo: res.success.admin_info })
          }
          loading(false)
        })
      break;
    case 'CHANGE_AUTH':
      loading(true)
      methodPost({ endpoint: '/account/editAuth', data: action.data })
        .then(res => {
          console.log('CHANGE_AUTH', res)
          if (res.success) {
            // alert(`${res.success}`)

            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/"
          }
          loading(false)
        })
      break;
    case 'CHANG_INFO':
      loading(true)
      methodPost({ endpoint: '/account/editInfo', data: action.data })
        .then(res => {
          console.log('CHANG_INFO', res)
          if (res.success) {
            // alert(`${res.success}`)

            swal("SUCCESS", `${res.success}`, "success");
            window.location.reload()
          }
          else {
            if (res.error.contact_ig) {
              alert(`${res.error.contact_ig[0]}`)
            }
            else if (res.error.contact_tele) {
              alert(`${res.error.contact_tele[0]}`)
            }
            else if (res.error.contact_wa) {
              alert(`${res.error.contact_wa[0]}`)
            }
            else if (res.error.phone_number) {
              alert(`${res.error.phone_number[0]}`)
            }
          }
          loading(false)
        })
      break;

    default:
      alert('not found api')
      break;
  }
}