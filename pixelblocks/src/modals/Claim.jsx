import { React, Component } from 'react';
import Modal from "./UniModal"

class Claim extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "body": "No pixel blocks selected"
    }
  }

  componentDidMount = async () => {
    if(this.props.selectedBlocks.length > 0) {
    this.setState({"body": await this.props.selectedBlocks.map((block, id) => (
        <tr key="id"><td key="id">{block.id}</td></tr>
    ))})
    }
  }

  render() {
    return (
            <Modal open={this.props.open} close={this.props.close}>
            <div>
                <td> {this.state.body} </td>
            </div>
            </Modal>
    )
  }
}

export default Claim;