# Populous Governance v2



## Ethereum (ropsten) test network deployment for Populous governance smart contracts with automated migration scripts in required order - 25/03/2021

```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[1]}`, 2
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4

pxt = 0x72C770aB6CA28114504255C6b5b2e67f9a4749DA
ppt = 0x350E7A260B584e24c04ac2ba682fa568D59c7829



Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000 (0x7a1200)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x7fc1fb0f6b88ac09d87335016d2907c921156c0e702ef76f20bf81364c097e6f
   > Blocks: 2            Seconds: 28
   > contract address:    0xB9f24459e6DF4558EFC57dbCa4C0db6Ae9602089
   > block number:        9905454
   > block timestamp:     1616684192
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.3180828379
   > gas used:            169802 (0x2974a)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003905446 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003905446 ETH


2_governance.js
===============

   Deploying 'PPTWrapper'
   ----------------------
   > transaction hash:    0xaf529de8e7f04748b6edc8a252f4b9cc1b93282ccf1832193a6f7f6af43e09c9
   > Blocks: 2            Seconds: 32
   > contract address:    0xC64cFF52cFEE19fa648E8879451696edc3EFDb0c
   > block number:        9905458
   > block timestamp:     1616684300
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.3110495069
   > gas used:            260118 (0x3f816)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.005982714 ETH


   Deploying 'PXTWrapper'
   ----------------------
   > transaction hash:    0x8075fd06f74bb14e3cf34a6a9c7f04814d1e0aa0d439ab420173ab4a88aa4bd6
   > Blocks: 0            Seconds: 0
   > contract address:    0x1a828EEC2afCfDad361C9C80ACF3101a69DbF960
   > block number:        9905461
   > block timestamp:     1616684307
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.3050667929
   > gas used:            260118 (0x3f816)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.005982714 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x1d2ba43df2245c1e80540af0b4c4e38131ad655c68b0c4c5f54934277aa5512a
   > Blocks: 2            Seconds: 4
   > contract address:    0x887d0fa4F7B3789abf15fFcFC8Fe34A745cdA81F
   > block number:        9905463
   > block timestamp:     1616684309
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.2897078989
   > gas used:            667778 (0xa3082)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.015358894 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0x02c6c1919dc10a8e7f36c3db2e9c26bf9b1129884bd5ccdf524f1f3c322da761
   > Blocks: 0            Seconds: 0
   > contract address:    0xe9D651c35e054b0A5a6b15349627584254300c9a
   > block number:        9905466
   > block timestamp:     1616684318
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.2223869679
   > gas used:            2926997 (0x2ca995)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.067320931 ETH


   Deploying 'Executor'
   --------------------
   > transaction hash:    0x2a3a3eb4a798e5d09d7a8759ac83056b7da9d628e6283be9ec136911acf4202d
   > Blocks: 0            Seconds: 0
   > contract address:    0x220a0906390d6C633675d54120263220fEF588aF
   > block number:        9905468
   > block timestamp:     1616684323
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.1808308899
   > gas used:            1806786 (0x1b91c2)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.041556078 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.136201331 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.140106777 ETH


```