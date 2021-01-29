pragma solidity 0.7.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";


/*
 * @title PixelBlocks.xyz ERC-721 Token "PXL"
 * visit: https://www.pixelblocks.xyz
 */
contract PixelBlocksToken is ERC721 {
    uint16 public blockAmount; // amount of available blocks
    address public creator;    // address of deployer
    uint16[] public minted;    // list of minted pixelblock tokens
    uint256 public counter;    // acounts mount of minted pixelblock tokens
    uint256 public price;      // actual price for one token
    mapping(uint256 => uint16) public metaState;
    uint256 public metaStateCounter;
    
    
    /*
     * initialize contract
     */
    constructor(uint16 _amount) public ERC721("PixelBlocks.xyz", "PXL") {
        blockAmount = _amount;
        creator = msg.sender;
        counter = 0;
        price = 0.001 ether;
        metaStateCounter = 0;
        metaState[0] = 1; 
    }

    /*
     * checks if a token is mintable
     */
    modifier isMintable(uint16 _blockID) {
        require(msg.sender != address(0), "ERC721: mint to the zero address");
        require(!_exists(_blockID), "ERC721: token already minted");
        require((_blockID >= 0 && _blockID <= blockAmount), "BlockID: block id invalid");
        _;
    }
    
    /*
     * checks if multiple tokens are mintable
     */
    modifier areMintable(uint16[] memory _blockIDs) {
         for(uint i = 0; i < _blockIDs.length; i++) {
            require(msg.sender != address(0), "ERC721: mint to the zero address");
            require(!_exists(_blockIDs[i]), "ERC721: token already minted");
            require((_blockIDs[i] >= 0 && _blockIDs[i] <= blockAmount), "BlockID: block id invalid");
         }
         _;
    }
    
    /*
     * checks if msg.sender is token owner
     */
    modifier isTokenOwner(uint16 _blockID) {
        require((ownerOf(_blockID) == msg.sender), "msg.sender: not owner of token");
        _;
    }
    
    /*
     * checks if msg.sender is contract deployer
     */
    modifier isCreator() {
        require((msg.sender == creator), "msg.sender: not creator of PXL");
        _;
    }
    
    /*
     * create and mint new token with specific id
     */
    function createToken(uint16 _blockID) public isMintable(_blockID) payable {
        require((msg.value >= price), "msg.value: not enough ether");
        _safeMint(msg.sender, _blockID);
        setTokenURI(_blockID, "PixelBlocks.xyz: pixel block not initialized");
        minted.push(_blockID);
        counter += 1;
    }
    
    /*
     * create and mint multiple new tokens with specific ids
     */
    function createTokens(uint16[] memory _blockIDs) public areMintable(_blockIDs) payable {
        require((msg.value >= _blockIDs.length*price), "msg.value: not enough ether");
        for(uint i = 0; i < _blockIDs.length; i++) {
            _safeMint(msg.sender, _blockIDs[i]);
            setTokenURI(_blockIDs[i], "PixelBlocks.xyz: pixel block not initialized");
            minted.push(_blockIDs[i]);
            counter += 1;
        }
    }
    
    /*
     * create and mint new token with specific id
     * creator only
     */
    function creatorCreateToken(uint16 _blockID) public isMintable(_blockID) isCreator {
        _safeMint(msg.sender, _blockID);
        setTokenURI(_blockID, "PixelBlocks.xyz: pixel block not initialized");
        minted.push(_blockID);
        counter += 1;
    }
    
    /*
     * create and mint multiple new tokens with specific ids
     * creator only
     */
    function creatorCreateTokens(uint16[] memory _blockIDs) public areMintable(_blockIDs) isCreator {
         for(uint i = 0; i < _blockIDs.length; i++) {
            _safeMint(msg.sender, _blockIDs[i]);
            setTokenURI(_blockIDs[i], "PixelBlocks.xyz: pixel block not initialized");
            minted.push(_blockIDs[i]);
            counter += 1;
        }
    }
    
    /*
     * set token uri
     */
    function setTokenURI(uint16 _blockID, string memory uri) public isTokenOwner(_blockID) {
        _setTokenURI(_blockID, uri);
        metaStateCounter += 1;
        metaState[metaStateCounter] = _blockID;
    }
    
    /*
     * set amount of mintable block token
     */
    function setBlockAmount(uint16 _amount) isCreator public {
        blockAmount = _amount;
    }
    
    /*
     * set price for each token
     */
    function setPrice(uint256 _price) isCreator public {
        price = _price;
    }
    
    /*
     * withdraw contract balance
     */
    function withdraw() isCreator public {
        payable(creator).transfer(address(this).balance);
    }
}