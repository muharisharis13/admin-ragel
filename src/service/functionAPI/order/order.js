import { methodGET, methodPost } from "../../method/method";

export const ApiOrder = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })
  let arrOrder = ({ data, max_page }) => dispatch({ type: 'SET_ORDER', arrOrder: data, max_pageOrder: max_page })
  switch (action.type) {

    case 'GET_ORDER_LIST_ALL':
      loading(true)
      methodPost({ endpoint: `/order/listAll?${action.page && `page=${action.page}`}`, data: action.data })
        .then(res => {
          console.log('GET_ORDER_LIST_ALL', res)
          if (res.success) {
            arrOrder({ data: res.success.data, max_page: res.success.max_page })
          }
          else {
            alert('error GET_ORDER_LIST_ALL')
          }
          loading(false)
        })
      break;

    default:
      break;
  }

}
