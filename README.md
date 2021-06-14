# Populous Governance v2

## Ethereum (ropsten network) deployment for Populous Governance smart contracts - 10/06/2021

## Contract addresses
```
deployer/admin - 0x614b32516601b7C424d0B284B498D5E14323ED3A

ppt = 0xb98D0E430175f343D43DfC113E8b31F49F71892d
pxt = 0x9510D07aa3B3394D2236dF039C5292C063D12487
votingToken = 0x3772FfAA0C1FA1e25ED67572ADf1e982776115be


2_governance_migration.js
=========================

   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x1af32962debe18be47408bf830d9055664d11b63210b5604723626aa401eec53
   > Blocks: 0            Seconds: 28
   > contract address:    0x6E98A8249aA853b85dC4d0d067fA5D8dc88b3035
   > block number:        10411195
   > block timestamp:     1623336916
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.762106168
   > gas used:            442148 (0x6bf24)
   > gas price:           80 gwei
   > value sent:          0 ETH
   > total cost:          0.03537184 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0x47671b8b7e94be7b9dade9bfd4471361e721ab746e831c60fc227a424f2b9e4c
   > Blocks: 1            Seconds: 20
   > contract address:    0xb4A8D080FAfD8588c578f64a93a43d0Ddec4c83E
   > block number:        10411197
   > block timestamp:     1623336967
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.439325128
   > gas used:            4034763 (0x3d90cb)
   > gas price:           80 gwei
   > value sent:          0 ETH
   > total cost:          0.32278104 ETH


   Deploying 'ProxyAdmin'
   ----------------------
   > transaction hash:    0x6e35c15c277646e7f4e5336d915e4eecab97f66d1b84497d01d4b813170ef0c9
   > Blocks: 1            Seconds: 36
   > contract address:    0xa40b36fEcBe5B6d391B876b6FfAD08A44B03cb7E
   > block number:        10411198
   > block timestamp:     1623336976
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.400603528
   > gas used:            484020 (0x762b4)
   > gas price:           80 gwei
   > value sent:          0 ETH
   > total cost:          0.0387216 ETH


   Deploying 'TransparentUpgradeableProxy'
   ---------------------------------------
   > transaction hash:    0x17a894da144faf1a29ba91ec3c2cfa273d233742877ce45df3b35656d27e2765
   > Blocks: 1            Seconds: 4
   > contract address:    0x3FA55162900c5FE60153eB6da20518a69F684ED3
   > block number:        10411200
   > block timestamp:     1623337020
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.339206088
   > gas used:            767468 (0xbb5ec)
   > gas price:           80 gwei
   > value sent:          0 ETH
   > total cost:          0.06139744 ETH

Governance V1 contract:  0x3FA55162900c5FE60153eB6da20518a69F684ED3

   Deploying 'Executor'
   --------------------
   > transaction hash:    0x6f3dae5acd4265ae6a025a9208e541a8000210c7f6a7642b170ce219719b8f0d
   > Blocks: 2            Seconds: 32
   > contract address:    0xEFE61DE4F797fBB29391b7BB44681808b4eC19EE
   > block number:        10411204
   > block timestamp:     1623337091
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             4.197168968
   > gas used:            1746358 (0x1aa5b6)
   > gas price:           80 gwei
   > value sent:          0 ETH
   > total cost:          0.13970864 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.59798056 ETH


3_transfer_ownership.js
=======================
✔ 0x3FA55162900c5FE60153eB6da20518a69F684ED3 (transparent) proxy ownership transfered through admin proxy

   
```

## Ethereum (live network) deployment for Populous Governance smart contracts - 09/06/2021

## Contract addresses
```
deployer/admin - 0x70393B06D018e148B593A91E022EA73071c17007


PPT: 0xd4fa1460F537bb9085d22C7bcCB5DD450Ef28e3a

PXT: 0xc14830E53aA344E8c14603A91229A0b925b0B262

ProxyAdmin: 0xEcB08C9F7c3e309D788663D5262663955C1D5320

Starting migrations...
======================
> Network name:    'live'
> Network id:      1
> Block gas limit: 15000000 (0xe4e1c0)


2_governance_migration.js
=========================

   Deploying 'PopulousGovernanceToken'
   -----------------------------------
   > transaction hash:    0x1d3573839fcd0cdf48d2b5488a8180a5c6149e71b22db5e06e9089df0ea92052
   > Blocks: 3            Seconds: 20
   > contract address:    0xECCBFB62B4de507E9709085ADF464Ae6B9f59ce7
   > block number:        12600919
   > block timestamp:     1623249678
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.975867644443941602
   > gas used:            992906 (0xf268a)
   > gas price:           90 gwei
   > value sent:          0 ETH
   > total cost:          0.08936154 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x828a1c6d1c080f7db36f8828384720278ce0886ee37ca8d7eec7cdecd62423c4
   > Blocks: 3            Seconds: 12
   > contract address:    0xCCbe9380a975E2c881e25d86957862f2C9a89727
   > block number:        12600922
   > block timestamp:     1623249701
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.936074324443941602
   > gas used:            442148 (0x6bf24)
   > gas price:           90 gwei
   > value sent:          0 ETH
   > total cost:          0.03979332 ETH


   Deploying 'TransparentUpgradeableProxy'
   ---------------------------------------
   > transaction hash:    0x81fbba1d3e189ba8ca0dbc5ba806778a4b5c2144895fbd53e1561cd4b7558d50
   > Blocks: 4            Seconds: 16
   > contract address:    0x4B5E9F22990F3469608937Cd36A7F5C0700218EE
   > block number:        12600926
   > block timestamp:     1623249726
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.867002204443941602
   > gas used:            767468 (0xbb5ec)
   > gas price:           90 gwei
   > value sent:          0 ETH
   > total cost:          0.06907212 ETH

Governance V1 contract:  0x4B5E9F22990F3469608937Cd36A7F5C0700218EE

   Deploying 'Executor'
   --------------------
   > transaction hash:    0x848e16434263665827a007500ec48d43379acc709aa78bba46216d4a5facb32c
   > Blocks: 3            Seconds: 28
   > contract address:    0x9F4DBA1c4930De6dd785d3AF165e9C0132556897
   > block number:        12600930
   > block timestamp:     1623249760
   > account:             0x70393B06D018e148B593A91E022EA73071c17007
   > balance:             0.705671444443941602
   > gas used:            1746358 (0x1aa5b6)
   > gas price:           90 gwei
   > value sent:          0 ETH
   > total cost:          0.15717222 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.3553992 ETH


3_transfer_ownership.js
=======================
✔ 0x2696966537B9f9F608F6963C51459555e08fbC49 (transparent) proxy ownership transfered through admin proxy
✔ 0x4B5E9F22990F3469608937Cd36A7F5C0700218EE (transparent) proxy ownership transfered through admin proxy

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


4_upgrade_governance.js
=======================

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   4
> Final cost:          0.3553992 ETH


```




## Local testing

```
npm i 
```

```
ganache-cli
```

```
truffle test
```