# Populous Governance v2


## Ethereum (ropsten) test network deployment for Populous Governance smart contracts - 07/05/2021

```
deployer/admin - 0x614b32516601b7C424d0B284B498D5E14323ED3A



Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000 (0x7a1200)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xb58830252ce6553955fdb57dce041bd82fc8603351f29f83dbbdc567612e76b7
   > Blocks: 1            Seconds: 48
   > contract address:    0xa826347ecbE80f4298f1dCde3F16063dc034948D
   > block number:        10131545
   > block timestamp:     1619621831
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.524950717
   > gas used:            169802 (0x2974a)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003905446 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003905446 ETH


2_governance_migration.js
=========================

   Deploying 'MockPPT'
   -------------------
   > transaction hash:    0x068500916465b497e8efc9b45514b4b9ab973b141dca98891bc3576791f9d0dd
   > Blocks: 0            Seconds: 12
   > contract address:    0x9bd5DB1b27101594Eb7cFCFFD9898F7416442f9C
   > block number:        10131549
   > block timestamp:     1619621923
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.508954355
   > gas used:            649815 (0x9ea57)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.014945745 ETH


   Deploying 'MockPXT'
   -------------------
   > transaction hash:    0x32f79a63682f00e05c9917c20b61058300fa7f0bde319eebc0aaeee3e0e65d3c
   > Blocks: 3            Seconds: 36
   > contract address:    0xa9E357c65a93519d2ee2844E163fB856aE595BA3
   > block number:        10131552
   > block timestamp:     1619621944
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.49400861
   > gas used:            649815 (0x9ea57)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.014945745 ETH


   Deploying 'MockVotingToken'
   ---------------------------
   > transaction hash:    0x08935d6fcb51d2bd3af3c0bc603187d05184aae0a8dbdc7f8ec5a6afc59d94a0
   > Blocks: 2            Seconds: 48
   > contract address:    0xcCCbEd1c6A39852530C8E2Af2820B218f16384Cd
   > block number:        10131555
   > block timestamp:     1619622003
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.471420333
   > gas used:            982099 (0xefc53)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.022588277 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0xd52d9e1010885b603cc8e9e735249d88d6d71b30991775625c93d32e5afff6c9
   > Blocks: 1            Seconds: 60
   > contract address:    0xE57B06e9a25d966f6a5c5862695fa1Bc9830150b
   > block number:        10131558
   > block timestamp:     1619622089
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.461419703
   > gas used:            434810 (0x6a27a)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.01000063 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0xed9bcc7a28570826c37092226caef4142a063ded2df6f31641a45278974b3006
   > Blocks: 1            Seconds: 8
   > contract address:    0x78e872b7Ae9b5D33542393d332758D70Ff0d9f79
   > block number:        10131561
   > block timestamp:     1619622098
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.370892807
   > gas used:            3935952 (0x3c0ed0)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.090526896 ETH


   Deploying 'Executor'
   --------------------
   > transaction hash:    0xcf6803d6d378b8570b335aab3386712e51736c002e47adb789c6ee28109b9acd
   > Blocks: 1            Seconds: 20
   > contract address:    0x892d56Be5C76534dB76e65e34cD27b621866F91f
   > block number:        10131564
   > block timestamp:     1619622194
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.329783228
   > gas used:            1741167 (0x1a916f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.040046841 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.193054134 ETH


Summary
=======
> Total deployments:   7
> Final cost:          0.19695958 ETH

```

## Local Tests


```
npm i 
```

```
ganache-cli
```

```
truffle test
```