import { Component } from 'react';
import { Grid, Box } from "@material-ui/core";
import logo from "../media/logo.png";

class Header extends Component {
  state = {}
  render() {
    return (
      <div>
        <Grid container spacing={0}>
        <Box display="flex" p={1} w={1} flexWrap="nowrap" width={900} height={20} bgcolor="white">
        <a href="/"><img src={logo} alt="Logo" height="20"/></a>
        
        </Box>
        </Grid>
      </div>
    );
  }
}

export default Header;