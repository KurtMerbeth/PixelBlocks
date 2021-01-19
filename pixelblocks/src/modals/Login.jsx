import React, { Component } from 'react';
import Modal from "./UniModal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }


  walletConnect = async () => {
    const provider = new WalletConnectProvider({
      infuraId: "15119f0f05bd45cd859eb838c7041e43", // Required
      rpc: {
        3: "https://ropsten-rpc.linkpool.io/"
      },
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar"
        ]
      }
    });

    await provider.enable();
    await this.setState({web3: new Web3(provider)});

    await this.state.web3.eth.getAccounts((error, accounts) => {
      if (accounts.length === 0) {
        console.log("no active accounts");
        // there is no active accounts
      } else {
        // after login, setState account, isLoggedIn and load actual balance
        console.log("account found");
        this.setState({account: accounts[0], isLoggedIn: true});
        console.log("account: "+this.props.account);
        this.loadBalance();
      }
    });
  }





  render() {
    return (
      <Modal open={this.props.open} close={this.props.close}>
        <div>Login</div>
      </Modal>
    );
  }
}

export default Login;