import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Nav from "./Components/Nav/Nav";
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

const Routes = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
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
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default Routes;
