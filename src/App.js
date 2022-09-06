import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import Investment from "./Investments";
import Savings from "./Savings";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

//test3

const App = () => {
  

  return(
    <Router>
      <GlobalStyles />
        <MainDiv>
          <Header />
            <Switch>

              <Route exact path="/">
                <Homepage/>
              </Route>

              <Route exact path="/savings">
                <Savings />
              </Route>

              <Route exact path="/investment">
                <Investment />
              </Route>

            </Switch>
            <Footer />
        </MainDiv>
      </Router>
  )
}

const MainDiv = styled.div`
background-color:#e4ddec ;
font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ;
`
export default App;
