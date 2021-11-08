import { methodGET, methodPost, methodPostImage } from "../../method/method"
import swal from 'sweetalert';




export const ApiArticle = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })

  switch (action.type) {
    case 'POST_DELETE_ARTICLE':
      loading(true)
      methodPost({ endpoint: `/article/del`, data: action.data })
        .then(res => {
          // Require : 
          // article_id
          console.log('POST_DELETE_ARTICLE', res)
          if (res.success) {
            // alert(`${res.success}`);

            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/blog"
          }
          loading(false)
        })
      break;
    case 'POST_EDIT_ARTICLE':
      loading(true)
      methodPostImage({ endpoint: `/article/edit`, data: action.data })
        .then(res => {
          // Require : 
          // article_id
          // Require :
          // article_title
          // article_description
          // article_pic[] (Support Multiple Pics)
          console.log('POST_EDIT_ARTICLE', res)
          if (res.success) {
            // alert(`${res.success}`)

            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/blog"
          }
          loading(false)
        })
      break;
    case 'POST_ADD_ARTICLE':
      loading(true)
      methodPostImage({ endpoint: `/article/add`, data: action.data })
        .then(res => {
          // Require :
          // article_title
          // article_description
          // article_pic[] (Support Multiple Pics)
          console.log('POST_ADD_ARTICLE', res)
          if (res.success) {
            // alert(`${res.success}`)

            swal("SUCCESS", `${res.success}`, "success");
            window.location.href = "/blog"
          }
          loading(false)
        })
      break;
    case 'GET_DETAIL_ARTICLE':
      loading(true)
      methodGET({ endpoint: `/article/detail/${action.id}` })
        .then(res => {
          console.log('GET_DETAIL_ARTICLE', res)
          if (res.success) {
            dispatch({ type: 'SET_DETAIL_ARTICLE', detailArticle: res.success })
          }
          else {
            dispatch({ type: 'SET_DETAIL_ARTICLE', detailArticle: {} })

          }
          loading(false)
        })
      break;
    case 'GET_ALL_ARTICLE':
      loading(true)
      methodGET({ endpoint: `/article/all` })
        .then(res => {
          console.log('GET_ALL_ARTICLE', res)
          if (res.success) {
            dispatch({ type: 'SET_ARTICLE', arrArticle: res.success })
          }
          loading(false)
        })
      break;

    default:
      break;
  }
}