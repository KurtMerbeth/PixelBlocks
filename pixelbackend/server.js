const PXL = require("./const");
const express = require("express");
const Web3 = require("web3");

const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const port = 3001;

const web3 = new Web3(new Web3.providers.HttpProvider(PXL.provider));
const pxl = new web3.eth.Contract(PXL.abi, PXL.address);

app.get('/', (req, res) => {
  res.send('Nice to meet you <3')
})

app.get('/api/getBlockAmount', async (req, res) => {
  res.send(await pxl.methods.blockAmount().call());
})

app.get('/api/getAllMintedBlocks', async (req, res) => {
  var pxlCounter = await pxl.methods.counter().call();
  var minted = [];
  for(var i = 0; i < pxlCounter; i++) {
      minted.push(await pxl.methods.minted(i).call());
    }
  minted.sort(function(a, b) {
    return a - b;
  });
  res.send(minted);
})


app.listen(port, () => {
  console.log(`PixelBlocks backend listening at http://localhost:${port}`)
})

