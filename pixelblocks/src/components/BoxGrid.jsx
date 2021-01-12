import { Component } from "react";
import { Grid, Box } from "@material-ui/core";
import { randomColor } from "randomcolor";
import { BoxGridStyle } from "../const/const.jsx"


class BoxGrid extends Component {
  state = {
    smolBox: []
  }

  componentDidMount = () => {
    var fillSmolBox = [];
    for (var i = 0; i < 100; i++) {
      fillSmolBox.push(i);
    }
    this.setState({ smolBox: fillSmolBox });
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          {this.state.smolBox.map(box => (
            <Grid item xs={0}>
              <Box m="auto" style={BoxGridStyle} width={30} height={30} bgcolor={randomColor()}>{box}</Box>
            </Grid>
          ))}
        </Grid>

      </div >
    );
  }
}

export default BoxGrid;