import { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Box } from "@material-ui/core";
import BoxGrid from "./components/BoxGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <center>
          <Box width={900}>
            <Header />
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <BoxGrid />
                </Route>
                <Route path="/menu">
                  <div>shizzle</div>
                </Route>
              </Switch>
            </BrowserRouter>
            <Footer />
          </Box>
        </center>
      </div>
    );
  }
}

export default App;