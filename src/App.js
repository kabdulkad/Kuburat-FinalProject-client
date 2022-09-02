import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import Investment from "./Investments";
import Savings from "./Savings";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

//testt

const App = () => {
  
// useEffect(() => {
//   fetch("/hello")
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// }, []) 
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
`
export default App;
