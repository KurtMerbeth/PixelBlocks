import { Component, React } from "react";
import { Grid, Box } from "@material-ui/core";
import { BoxGridStyle, BoxGridButtonSytle } from "../const/const.jsx"
import Button from '@material-ui/core/Button';

class BoxGrid extends Component {
  state = {
    smolBox: []
  }

  componentDidMount = () => {
    var smolBox = [];
    for (var i = 0; i < 102; i++) {
      var bgcolor = this.returnColor(i);
      smolBox.push({ "id": i, "bgcolor": bgcolor });
    }
    this.setState({ smolBox: smolBox });
  }

  returnColor = (id) => {
    return ((id % 2 === 0) ? '#dedede' : '#e8e8e8');
  }

  clickBox = (id) => {
    let smolBox = [...this.state.smolBox]; // copy smolBox state
    let clickedBox = {...smolBox[id]};     // get clicked box
    clickedBox.bgcolor = (clickedBox.bgcolor === "#bed1c4" ? this.returnColor(id) : "#bed1c4");        // change color
    smolBox[id] = clickedBox;              // put clickedBox back
    this.setState({smolBox})               // set new state
    console.log(clickedBox)
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          {this.state.smolBox.map(box => (
            <Grid item>
              <Box m="auto" style={BoxGridStyle} bgcolor={box.bgcolor}>
                <Button style={BoxGridButtonSytle} onClick={() => { this.clickBox(box.id) }}>
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