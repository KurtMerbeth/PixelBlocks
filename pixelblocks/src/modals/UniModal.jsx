import { React, Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { Box } from "@material-ui/core";
import { ModalStyle, BoxStyle, DivStyle } from "../const/const.jsx"

class UniModal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() { this.props.close(); }


  render() {
    if(!this.props.open) {
      return null;
    }
    return (
      <div>
        <Modal className="claim" style={ModalStyle}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="claim-modal"
          aria-describedby="claim-modal-descr">
          <Box className="claimbox" style={BoxStyle}>
            <div className="claimdiv" sytel={DivStyle}>
                {this.props.children}
            </div>
          </Box>
        </Modal>
      </div>
    )
  }
}

export default UniModal;