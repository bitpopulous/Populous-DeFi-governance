# Populous Governance v2


## Ethereum (ropsten) test network deployment for Populous governance smart contracts with automated migration scripts in required order - 05/01/2021

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
   > transaction hash:    0x210587ec9fea728cd11e7a7ff317c1e12dae0ba2242ce9f56e546e705ce21145
   > Blocks: 2            Seconds: 54
   > contract address:    0x4C2f11ed2c19FA0E1092A67966314AF8bFe59B4f
   > block number:        9402506
   > block timestamp:     1609854830
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.837538222
   > gas used:            168502 (0x29236)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.003875546 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.003875546 ETH


2_governance.js
===============

   Deploying 'PPTWrapper'
   ----------------------
   > transaction hash:    0x34d2eac0992cfbb2a650e8d53ca52e680f6c0f51e9245c4c2ebe3af6fc9ff5e7
   > Blocks: 0            Seconds: 0
   > contract address:    0xffE71498Aab10f0A2cf2b2f1fd31F4769B6f52Bb
   > block number:        9402509
   > block timestamp:     1609854898
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.822738205
   > gas used:            601200 (0x92c70)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138276 ETH


   Deploying 'PXTWrapper'
   ----------------------
   > transaction hash:    0x20b1bd34f58af84d28c12ae46e473abf65c12f355928317d4ac6cf676ccd40f7
   > Blocks: 1            Seconds: 28
   > contract address:    0xE6eD615A69D81bFdF401e43171d8c2B995E1E55A
   > block number:        9402511
   > block timestamp:     1609854906
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.808910605
   > gas used:            601200 (0x92c70)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138276 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x81272ab6f31eb2d17bd2cdd1ed5dbdab8bb475ffa23ab09f30b6b6b12d54c75c
   > Blocks: 0            Seconds: 12
   > contract address:    0xE3849b8eA7E92B7a49Cc9a053578B82B1079A6B6
   > block number:        9402513
   > block timestamp:     1609854941
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.802292148
   > gas used:            287759 (0x4640f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.006618457 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0x8f28ed2cbba86666aac1b58a4931ebd1d27eccebc3bdbad7def2e960983c8210
   > Blocks: 2            Seconds: 88
   > contract address:    0xD201eFbfBB069Bc69741a2d03c4Fc90bA0Ce46D4
   > block number:        9402516
   > block timestamp:     1609854970
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.735210877
   > gas used:            2916577 (0x2c80e1)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.067081271 ETH


   Deploying 'Executor'
   --------------------
   > transaction hash:    0x3869d329facb6422ab8ce2fb96e832695de63e302f785b73f6580b33d3e16037
   > Blocks: 1            Seconds: 41
   > contract address:    0xCC6fbA7c383300ec5BDDbc2bCD7ff2a6d8dDAACf
   > block number:        9402518
   > block timestamp:     1609855079
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.69399812
   > gas used:            1791859 (0x1b5773)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.041212757 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.142567685 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.146443231 ETH

```