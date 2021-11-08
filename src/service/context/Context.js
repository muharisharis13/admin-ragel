import React, { useReducer, createContext } from 'react'
import { reducer } from './reducer/reducer';
import { reducer_article } from './reducer/article';
import { initilaState } from './state/initial'
import { ApiLoginSignUp } from '../functionAPI/login/ApiLoginSignUp'
import { ApiProduk } from '../functionAPI/product/product/produk_promotion';
import { ApiOrder } from '../functionAPI/order/order';
import { ApiEvent } from '../functionAPI/event/event';
import { ApiArticle } from '../functionAPI/article/article';
import { produk } from './state/produk';
import { event } from './state/event';
import { order } from './state/order';
import { article } from './state/article';
import { member } from './state/member';
import { ApiMember } from '../functionAPI/member/member';
import { shipping } from './state/shipping';
import { ApiShipping } from '../functionAPI/shipping/shipping';
import { ApiDeposit } from '../functionAPI/deposit/deposit';
import { deposit } from './state/deposit';


export const Context = createContext()



const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initilaState, ...produk, ...event, ...order, ...article, ...member, ...shipping, ...deposit });

  const apiLoginSignUp = ApiLoginSignUp(dispatch)
  const apiproduk = ApiProduk(dispatch)
  const apiorder = ApiOrder(dispatch)
  const apievent = ApiEvent(dispatch)
  const apiarticle = ApiArticle(dispatch)
  const apimember = ApiMember(dispatch)
  const apishipping = ApiShipping(dispatch)
  const apideposit = ApiDeposit(dispatch)


  // console.log(reducer)

  return (
    <Context.Provider
      value={{ ...state, dispatch, apiLoginSignUp, apiproduk, apiorder, apievent, apiarticle, apimember, apishipping,apideposit }}>
      {children}
    </Context.Provider>
  )
}

export default Store