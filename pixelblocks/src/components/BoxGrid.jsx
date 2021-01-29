import { Component, React } from "react";
import { Grid, Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { apiCall } from "../const/const";

class BoxGrid extends Component {
  state = {
    smolBox: []
  }

  componentDidMount = async () => {
    this.renderBoxes();
  }

  renderBoxes = async () => {
    var smolBox = [];
    for (var i = 0; i < this.props.blockAmount; i++) {
      var bgcolor = this.returnColor(i);
      smolBox.push({ "id": i, "bgcolor": bgcolor });
    }
    this.setState({ smolBox: smolBox });
  }

  returnColor = (id) => {
    return ((id % 2 === 0) ? '#dedede' : '#e8e8e8');
  }

  clickBox = async (id) => {
    let smolBox = [...this.state.smolBox]; // copy smolBox state
    let clickedBox = {...smolBox[id]};     // get clicked box
    clickedBox.bgcolor = (clickedBox.bgcolor === "#bed1c4" ? this.returnColor(id) : "#bed1c4");        // change color
    smolBox[id] = clickedBox;              // put clickedBox back
    this.setState({smolBox})               // set new state
    this.props.setSelectedBlocks(this.state.smolBox.filter(box => box.bgcolor === "#bed1c4"));
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          {this.state.smolBox.map((box, id) => (
            <Grid key={id}>
              <Box m="auto" className="boxgrid" bgcolor={box.bgcolor}>
                <Button key={id} className="button" onClick={() => { this.clickBox(box.id) }}>
                  {box.id}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

      </div >
    );
  }
}

export default BoxGrid;