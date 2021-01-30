import { Component, React } from "react";
import { Grid, Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import sold from '../media/sold.png'

class BoxGrid extends Component {
  state = {
    smolBox: []
  }

  componentDidMount = async () => {
    this.renderBoxes();
  }

  renderBoxes = async () => {
    var smolBox = [];
    for (var i = 0; i < this.props.blockData.blockAmount; i++) {
      if(this.props.blockData.mintedBlocks.hasOwnProperty(i)){    // is block sold?
        console.log("hasProp:" +i);                               // get block data
        smolBox.push({ "id": i, "class": "box-sold", "sold": true}); 
      } else {
        smolBox.push({ "id": i, "class": this.setBoxClass(i), "sold": false});   // add avaible blocks
      }
    }
    this.setState({ smolBox: smolBox });
    console.log(smolBox);
  }

  setBoxClass = (id) => {
    return ((id % 2 === 0) ? 'box-even' : 'box-odd');
  }

  clickBox = async (id) => {
    let smolBox = [...this.state.smolBox]; // copy smolBox state
    let clickedBox = {...smolBox[id]};     // get clicked box
    clickedBox.class = (clickedBox.class === 'box-clicked' ? this.setBoxClass(id) : 'box-clicked'); 
    smolBox[id] = clickedBox;              // put clickedBox back
    this.setState({smolBox})               // set new state
    this.props.setSelectedBlocks(this.state.smolBox.filter(box => box.class === "box-clicked"));
  }

  render() {
    return (
      <div>
        <Grid container className="container">
          {this.state.smolBox.map((box, id) => (
            <Grid key={id}>
              <Box m="auto" className={box.class}>
                {!box.sold && 
                  <Button key={id} className="button active" onClick={() => { this.clickBox(box.id) }}>
                    {box.id}
                  </Button>}

                {box.sold &&
                  <img src={sold} />}
              </Box>
            </Grid>
          ))}
        </Grid>

      </div >
    );
  }
}

export default BoxGrid;