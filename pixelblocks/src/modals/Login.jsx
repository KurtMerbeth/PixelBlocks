import React, { Component } from 'react';
import Modal from "./UniModal";
import WalletConnectProvider from "@walletconnect/web3-provider";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
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