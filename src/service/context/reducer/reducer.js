import { reducer_article } from "./article"


export const reducer = (state, action) => {



  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: action.loading
    }
  }
  if (action.type === 'LOADING_BTN') {
    return {
      ...state,
      loading_btn: action.loading_btn
    }

  }
  else if (action.type === 'REDIRECT') {
    return {
      ...state,
      redirect: action.redirect
    }

  }
  else if (action.type === 'ARR_PRODUK') {
    return {
      ...state,
      arrProduk: action.arrProduk
    }

  }
  else if (action.type === 'ARR_PRODUK_SOLD') {
    return {
      ...state,
      arrProdukSold: action.arrProdukSold
    }

  }
  else if (action.type === 'ARR_PRODUK_SOLD_THIS_MONTH') {
    return {
      ...state,
      arrProdukSoldThisMonth: action.arrProdukSoldThisMonth
    }

  }
  else if (action.type === 'ARR_PRODUK_PROMOSI') {
    return {
      ...state,
      arrProdukPromosi: action.arrProdukPromosi
    }

  }
  else if (action.type === 'LENGTH_PRODUK') {
    return {
      ...state,
      lengthProduk: action.lengthProduk
    }

  }
  else if (action.type === 'SET_EVENT') {
    return {
      ...state,
      arrEvent: action.arrEvent
    }
  }
  else if (action.type === 'SET_ORDER') {
    return {
      ...state,
      arrOrder: action.arrOrder,
      max_pageOrder: action.max_pageOrder
    }
  }
  else if (action.type === 'SET_ARTICLE') {
    return {
      ...state,
      arrArticle: action.arrArticle
    }
  }
  else if (action.type === 'SET_DETAIL_ARTICLE') {
    return {
      ...state,
      detailArticle: action.detailArticle
    }
  }
  else if (action.type === 'SET_INFO') {
    return {
      ...state,
      arrInfo: action.arrInfo
    }
  }
  else if (action.type === 'SET_MEMBER') {
    return {
      ...state,
      arrMember: action.arrMember,
      max_pageMember: action.max_pageMember
    }
  }
  else if (action.type === 'SET_MEMBER_DETAILS_1ST') {
    return {
      ...state,
      arrMemberDetails1st: action.arrMemberDetails1st
    }
  }
  else if (action.type === 'SET_MEMBER_DETAILS_2ND') {
    return {
      ...state,
      arrMemberDetails2nd: action.arrMemberDetails2nd
    }
  }
  else if (action.type === 'SET_DATA_SOLD_THIS_MONTH') {
    return {
      ...state,
      dataSoldThisMonth: action.dataSoldThisMonth
    }
  }
  else if (action.type === 'SET_DATA_PROFIT_THIS_MONTH') {
    return {
      ...state,
      dataProfitThisMonth: action.dataProfitThisMonth
    }
  }
  else if (action.type === 'SET_MEMBER_TOPUP_HISTORY_SUCCESS') {
    return {
      ...state,
      arrHistorySuccess: action.arrHistorySuccess,
      max_pageMemberHistorySuccess: action.max_pageMemberHistorySuccess
    }
  }
  else if (action.type === 'SET_MEMBER_TOPUP_HISTORY_REJECT') {
    return {
      ...state,
      arrHistoryReject: action.arrHistoryReject,
      max_pageMemberHistoryReject: action.max_pageMemberHistoryReject
    }
  }
  else if (action.type === 'SET_SHIPPING') {
    return {
      ...state,
      arrShipping: action.arrShipping,
      max_pageShipping: action.max_pageShipping,
      pageShipping: action.pageShipping
    }
  }
  else if (action.type === 'SET_DEPOSIT') {
    return {
      ...state,
      arrDeposit: action.arrDeposit,
      max_pageDeposit: action.max_pageDeposit
    }
  }
  else if (action.type === 'SET_DEPOSIT_ALL') {
    return {
      ...state,
      arrDepositAll: action.arrDepositAll,
      max_pageDepositAll: action.max_pageDepositAll
    }
  }
  else if (action.type === 'SET_DEPOSIT_DETAIL') {
    return {
      ...state,
      dataDepositDetail: action.dataDepositDetail
    }
  }
  else {
    // alert('error reducer')
  }
}