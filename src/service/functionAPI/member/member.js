import { methodGET, methodPost } from "../../method/method";

export const ApiMember = dispatch => action => {
  let loading = (props) => dispatch({ type: 'LOADING', loading: props })
  let set_member = ({ arrMember, max_page }) => dispatch({ type: 'SET_MEMBER', arrMember: arrMember, max_pageMember: max_page })

  switch (action.type) {
    case `GET_MEMBER_SOLD_BY_ID`:
      loading(true)
      methodGET({ endpoint: `/company/productSoldById/${action.member_id}` })
        .then(res => {
          console.log('GET_MEMBER_SOLD_BY_ID', res)
          if (res.success) {
            dispatch({ type: 'SET_DATA_SOLD_THIS_MONTH', dataSoldThisMonth: res.success })
          }
          else {
            alert('error get Member')
          }
          loading(false)
        })

      break;
    case `GET_MEMBER_PROFIT_BY_ID`:
      loading(true)
      methodGET({ endpoint: `/company/profitById/${action.member_id}` })
        .then(res => {
          console.log('GET_MEMBER_PROFIT_BY_ID', res)
          if (res.success) {
            dispatch({ type: 'SET_DATA_PROFIT_THIS_MONTH', dataProfitThisMonth: res.success })
          }
          else {
            alert('error get Member')
          }
          loading(false)
        })

      break;
    case `GET_MEMBER_DETAIL_2ND`:
      loading(true)
      methodGET({ endpoint: `/company/2ndLineDetail/${action.id}` })
        .then(res => {
          console.log('GET_MEMBER_DETAIL_2ND', res)
          if (res.success) {
            dispatch({ type: 'SET_MEMBER_DETAILS_2ND', arrMemberDetails2nd: res.success.array_downline })
          }
          else {
            alert('error get Member')
          }
          loading(false)
        })

      break;
    case `GET_MEMBER_DETAIL_1ST`:
      loading(true)
      methodGET({ endpoint: `/company/1stLineDetail/${action.id}` })
        .then(res => {
          console.log('GET_MEMBER_DETAIL_1ST', res)
          if (res.success) {
            dispatch({ type: 'SET_MEMBER_DETAILS_1ST', arrMemberDetails1st: res.success.array_downline })
          }
          else {
            alert('error get Member')
          }
          loading(false)
        })

      break;
    case `GET_MEMBER_REQ`:
      loading(true)
      methodGET({ endpoint: `/member/req` })
        .then(res => {
          console.log('GET_MEMBER_REQ', res)
          if (res.success) {
            dispatch({ type: 'SET_MEMBER', arrMember: res.success.data, max_pageMember: res.success.max_page })
          }
          else {
            alert('error get Member')
          }
          loading(false)
        })

      break;
    case `GET_MEMBER`:
      loading(true)
      set_member({ arrMember: [], max_page: 0 })
      methodGET({ endpoint: `/company/member?${action.page !== undefined ? `page=${action.page}` : ""}` })
        .then(res => {
          console.log('GET_MEMBER', res)
          if (res.success) {
            dispatch({ type: 'SET_MEMBER', arrMember: res.success.data, max_pageMember: res.success.max_page })
          }
          else {
            alert('error get Member')
          }
          loading(false)
        })

      break;
    case `POST_VERIF_MEMBER`:
      loading(true)
      methodPost({ endpoint: `/member/verif`, data: action.data })
        .then(res => {
          // Require :
          //   member_id
          console.log('POST_VERIF_MEMBER', res)
          // if(res.success){
          //   dispatch({type:'SET_MEMBER', arrMember : res.success.request_list})
          // }
          // else{
          //   alert('error get Member')
          // }
          loading(false)
        })

      break;
    case `POST_REJECT_MEMBER`:
      loading(true)
      methodPost({ endpoint: `/member/reject`, data: action.data })
        .then(res => {
          // Require :
          //   member_id
          console.log('POST_REJECT_MEMBER', res)
          // if(res.success){
          //   dispatch({type:'SET_MEMBER', arrMember : res.success.request_list})
          // }
          // else{
          //   alert('error get Member')
          // }
          loading(false)
        })

      break;

    default:
      break;
  }


}