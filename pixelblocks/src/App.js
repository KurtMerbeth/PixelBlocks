import { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Box } from "@material-ui/core";
import BoxGrid from "./components/BoxGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Claim from "./modals/Claim";
import Login from "./modals/Login";
import Dev from "./components/Dev";
import './style.scss'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "isDev": false,
      "selectedBlocks": [],
      "showMain": false,
      "openClaim": false,
      "openLogin": false,
      "isLoggedIn": false,
      "web3": 'undefined',
      "account": 'undefined',
      "blockData": 'undefined'
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

  fetchData = async () => {
    var data = await fetch('http://localhost:3001/api/data')
    .then(res => {
      return res.json();
    })
    .then(data => {
      return this.setState({blockData: data, showMain: true})
    })
  }


  componentDidMount = () => {
    this.fetchData();
  }


  render() {
    return (
      <div className="app">
          <Box className="mainBox">
            <Header claim={this.claim} login={this.login}/>
            {this.state.isDev && <Dev />}
            <Claim open={this.state.openClaim} close={this.closeClaim} selectedBlocks={this.state.selectedBlocks}/>
            <Login open={this.state.openLogin} close={this.closeLogin} />
            
            <BrowserRouter>
              <Switch>

                <Route exact path="/">
                  {this.state.showMain && <BoxGrid blockData={this.state.blockData} setSelectedBlocks={this.setSelectedBlocks}/>}
                </Route>

                <Route path="/menu">
                  <div>shizzle</div>
                </Route>
              
              </Switch>
            </BrowserRouter>
            <Footer />
          </Box>
      </div>
    );
  }
}

export default App;