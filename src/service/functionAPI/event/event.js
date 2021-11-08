import { methodGET, methodPost } from "../../method/method"
import swal from 'sweetalert'





export const ApiEvent = dispatch => action => {
  let loading = (props) => dispatch({ type: "LOADING", loading: props })

  switch (action.type) {
    case 'GET_DETAIL_EVENT':
      loading(true)
      methodGET({ endpoint: `/event/detail/${action.id}` })
        .then(res => {
          console.log('GET_DETAIL_EVENT', res)
          loading(false)
        })
      break;
    case 'GET_ALL_EVENT':
      loading(true)
      methodGET({ endpoint: `/event/all` })
        .then(res => {
          console.log('GET_ALL_EVENT', res)
          dispatch({ type: 'SET_EVENT', arrEvent: res.success })
          loading(false)
        })
      break;
    case 'POST_ADD_EVENT':
      loading(true)
      methodPost({ endpoint: `/event/add`, data: action.data })
        .then(res => {
          // Require : 
          //   event_name
          //   event_description
          //   event_start_datetime
          //   event_end_datetime
          console.log('POST_ADD_EVENT', res)
          if (res) {
            if (res.success) {
              // alert(`${res.success}`)
              swal("SUCCESS", `${res.success}`, "success");
              window.location.href = "/event"
            }
            else {
              alert('error add event')
            }

          }
          else {
            alert(`${res}`)
          }
          loading(false)
        })
      break;
    case 'POST_EDIT_EVENT':
      loading(true)
      methodPost({ endpoint: `/event/edit`, data: action.data })
        .then(res => {
          // Require : 
          // event_id

          // Not Require : 
          // event_name
          // event_description
          // event_start_datetime
          // event_end_datetime
          console.log('POST_EDIT_EVENT', res)
          loading(false)
        })
      break;
    case 'POST_DELETE_EVENT':
      loading(true)
      methodPost({ endpoint: `/event/del`, data: action.data })
        .then(res => {
          // Require : 
          // event_id

          console.log('POST_DELETE_EVENT', res)
          if(res){
            if(res.success){
              // alert(`${res.success}`)
              
              swal("SUCCESS", `${res.success}`, "success");
              window.location.href = "/event"
            }
            else{
              alert('error delete event')
            }
          }
          else{
            alert(`${res}`)
          }
          loading(false)
        })
      break;

    default:
      break;
  }
}