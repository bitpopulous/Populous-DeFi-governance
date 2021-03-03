const {
    getIpfsHashFromBytes32, getBytes32FromIpfsHash
} = require('./ipfs-hex');

//QmYFSYTNqafvDsU1fUvCeAqJk1AuePJ2qvpE3XanJo6ZH6
console.log(getBytes32FromIpfsHash('QmYFSYTNqafvDsU1fUvCeAqJk1AuePJ2qvpE3XanJo6ZH6'))

//console.log(getIpfsHashFromBytes32('0x933f3568af3f6528df60bc0f4eb7e6d60f75043316b9de3f1d7f62389815752d'))