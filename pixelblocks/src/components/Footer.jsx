import { Component } from 'react';
import { Grid, Box } from "@material-ui/core";

class Footer extends Component {
  state = {}
  render() {
    return (
      <div>
        <Grid container spacing={0}>
        <Box p={1} w={1} flexWrap="nowrap" width={900} height={20} bgcolor="white">
          Footer
        </Box>
        </Grid>
      </div>
    );
  }
}

export default Footer;