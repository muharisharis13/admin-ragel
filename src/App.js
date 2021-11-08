import { Navbar } from "./component/navbar/navbar";
import { Route, Redirect, Switch } from 'react-router-dom'
import { Dashboard } from "./pages/dashboard/Dashboard";
import styled from 'styled-components'
import { Sales } from "./pages/sales/Sales";
import { Product } from "./pages/product/Product/Product";
import { NewProduct } from "./pages/product/NewProduct/NewProduct";
import { TotalProductSoldThisMonth } from "./pages/product/TotalproductSold/TotalProductSoldThisMonth";
import { TotalProduct } from "./pages/product/TotalProduct/TotalProduct1";

import { EditProduct } from "./pages/product/EditProduct/EditProduct";
import { PromotionProduct } from "./pages/product/promotionProduct/PromotionProduct";
import { ListPromotionProduct } from "./pages/product/ListPromotionProduct/ListPromotionProduct";
import { Events } from "./pages/events/event/Events";
import { ListEvent } from "./pages/events/listEvent/ListEvent";
import { getCookies } from './service/cookies/Cookies'
import { IndexOrder } from './pages/order/OrderShipping/index'
import { Info } from "./pages/setting/info/Info";
import { Auth } from "./pages/setting/auth/Auth";
import React, { useContext } from 'react'
import { Context } from "./service/context/Context";
import { LoadingPage } from "./component/loading/page/loading";
import { Member } from "./pages/member/MemberList/member";
import { MemberDetail } from "./pages/member/MemberList/memberDetail/memberDetail";
import { Blog } from "./pages/blog/blog";
import { AddBlog } from "./pages/blog/addBlog/addBlog";
import { EditBlog } from "./pages/blog/editBlog/detailBlog";
import { FieldEdit } from "./pages/blog/editBlog/FieldEdit";
import { Shipping } from './pages/shipping/shipping/Shipping'
import { IndexOrderTakeOffice } from "./pages/order/OrderTakeOffice/indexTakeOffice";
import { TopupMember } from "./pages/member/topup/topup";
import { MemberRequest } from "./pages/member/memberRequest/MemberRequest";
import { PaymentGate } from "./pages/PaymentGate/PaymentGate";
import { SignUp } from "./pages/login/SignUp";


function App() {
  const { loading } = useContext(Context)

  return (
    <div>
      {
        loading && <LoadingPage />
      }
      <div className="header">
        <Navbar />
      </div>
      {
        getCookies({ key: 'token' }) ?
      <Content>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/sales" component={Sales} />
              <Route path="/product" component={Product} />
              <Route path="/products/addNewProduct" component={NewProduct} />
              <Route path="/products/TotalProductSold" component={TotalProductSoldThisMonth} />
              <Route path="/products/TotalProduct" component={TotalProduct} />
              <Route path="/products/EditProduct" component={EditProduct} />
              <Route path="/products/PromotionsProduct" component={PromotionProduct} />
              <Route path="/products/ListPromotionProduct" component={ListPromotionProduct} />
              <Route path="/event" component={Events} />
              <Route path="/events/listEvent" component={ListEvent} />
              <Route path="/order" component={IndexOrder} />
              <Route path="/orderManual" component={IndexOrderTakeOffice} />
              <Route path="/settings/info" component={Info} />
              <Route path="/settings/auth" component={Auth} />
              <Route path="/memberTopup" component={TopupMember} />
              <Route path="/member" component={Member} />
              <Route path="/members/detail/:id" component={MemberDetail} />
              <Route path="/members/request" component={MemberRequest} />
              <Route path="/blog" component={Blog} />
              <Route path="/blogs/addBlog" component={AddBlog} />
              <Route path="/blogs/editBlog/:id" component={EditBlog} />
              <Route path="/blogs/editBlogs/InputFieldEdit" component={FieldEdit} />
              <Route path="/shipping" component={Shipping} />
              <Route path="/payment" component={PaymentGate} />
              <Route path="/signup" component={SignUp} />

            </Switch>
      </Content>

          : <Redirect to="/login" />
      }
    </div>
  );
}


const Content = styled.div`
padding-left: 270px;
z-index:1;
margin-top:-80px;
padding-top:80px;
@media only screen and (min-width: 320px) and (max-width: 425px){
  padding-left: 0px;
}
`

export default App;
