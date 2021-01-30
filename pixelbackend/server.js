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

var dataCache = {
    "blockAmount": 0,
    "price": 0,
    "oldMetaState": 0,
    "newMetaState": 0,
    "mintedAmount": 0,
    "mintedBlocks": {}
};

// checks if cache must update and returns dataCache
handleCache = async () => {
  var lastMetaState = await pxl.methods.metaStateCounter().call();
  if(dataCache.oldMetaState < lastMetaState) {
    dataCache.newMetaState = lastMetaState;
    await updateCache();
  }
  return dataCache;
}

// updates cache data
updateCache = async () => {
  for(var i = dataCache["oldMetaState"]+1; i <= dataCache.newMetaState; i++) {
    var blockID = await pxl.methods.metaState(i).call();
    if(dataCache["mintedBlocks"].hasOwnProperty(blockID)) {
      dataCache.mintedBlocks[blockID] = await getBlockMetadata(blockID);
    }
    dataCache.mintedBlocks[blockID] = await getBlockMetadata(blockID);
    console.log("update block: "+blockID);
  }
  dataCache.oldMetaState = dataCache.newMetaState;
  await initGeneralData();
}

getLastMetaState = async () => {
  return pxl.methods.metaStateCounter().call();
}

getBlockMetadata = (blockID) => {
  return pxl.methods.tokenURI(blockID).call();
}

initGeneralData = async () => {
  dataCache.blockAmount = await pxl.methods.blockAmount().call();
  dataCache.price = await pxl.methods.price().call();
  dataCache.oldMetaState = dataCache.newMetaState;
  dataCache.mintedAmount = await pxl.methods.counter().call();
}




app.get('/api/data', async (req, res) => {
  data = await handleCache();
  console.log(data)
  res.send(data);
})


app.get('/', (req, res) => {
  res.send('Nice to meet you <3')
})








// not used:
getBlockAmount = async() => {
  return await pxl.methods.blockAmount().call();
}

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

