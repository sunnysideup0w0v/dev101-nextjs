import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Nav from "./Components/Nav/Nav"; // Nav 컴포넌트 안보임...?
import Login from "./Pages/Login/Login";
import LoginAnother from "./Pages/Login/LoginAnother";
import SignUp from "./Pages/SignUp/SignUp";
import { Main } from "./Pages/Main";
import MyPage from "../src/Pages/MyPage/MyPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import Footer from "./Components/Footer";
import theme from "./Styles/common";
import Detail from "./Pages/Detail";
import store from "./store/store";
import Creators from "./Pages/Creators";
import PackageSelector from "./Pages/PackageSelector";
import Payment from "./Pages/SearchPage";
import CardPayment from "./Pages/CardPayment";
import Category from "./Pages/Category/Category";
import ScrollToTop from "./Components/ScrollToTop";

const Router = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              component={
                <>
                  <ScrollToTop />
                </>
              }
            />
            <Route index element={<Main />} />
            <Route exact path="/category/:id" component={Category} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/LoginAnother" component={LoginAnother} />
            <Route exact path="/myPage" component={MyPage} />
            <Route exact path="/creators" component={Creators} />
            <Route exact path="/searchPage/" component={SearchPage} />
            <Route exact path="/searchPage/:searchVal" component={SearchPage} />
            <Route exact path="/detail/:id/package" component={PackageSelector} />
            <Route exact path="/detail/:id/payment" component={Payment} />
            <Route exact path="/detail/:id/cardpayment" component={CardPayment} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/LoginAnother" component={LoginAnother} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default Router;
