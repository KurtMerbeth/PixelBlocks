import { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Box } from "@material-ui/core";
import BoxGrid from "./components/BoxGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Claim from "./modals/Claim";
import Login from "./modals/Login"
import './style.scss'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "selectedBlocks": [],
      "openClaim": false,
      "openLogin": false,
      "isLoggedIn": false,
      "web3": 'undefined',
      "account": 'undefined'
    };
  }


  setSelectedBlocks = (_selectedBlocks) => {
    this.setState({"selectedBlocks": _selectedBlocks});
  }

  claim = () => { this.setState({"openClaim": true}) }
  closeClaim = () => { this.setState({"openClaim": false})  }

  login = () => { this.setState({"openLogin": true}) }
  closeLogin = () => { this.setState({"openLogin": false}) }

  setWeb3 = (_web3, _account) => { this.setState({"web3": _web3, "account": _account, "isLoggedIn": true}) }

  render() {
    return (
      <div className="app">
        <center>
          <Box width={930}>
            <Header claim={this.claim} login={this.login}/>
            <Claim open={this.state.openClaim} close={this.closeClaim} selectedBlocks={this.state.selectedBlocks}/>
            <Login open={this.state.openLogin} close={this.closeLogin} />
            
            <BrowserRouter>
              <Switch>

                <Route exact path="/">
                  <BoxGrid setSelectedBlocks={this.setSelectedBlocks}/>
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