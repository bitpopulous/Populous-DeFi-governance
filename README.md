# Populous Governance v2


## Ethereum (ropsten) test network deployment for Populous governance smart contracts with automated migration scripts in required order - 08/01/2021

```
infura key/address used - https://ropsten.infura.io/v3/${secret.infuraKey[1]}`, 2
0xC6561dF9180a8863fA9a16aB376eFbca17166CF4

pxt = 0x72C770aB6CA28114504255C6b5b2e67f9a4749DA
ppt = 0x350E7A260B584e24c04ac2ba682fa568D59c7829





Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000029 (0x7a121d)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xaca0629caca4b73efa95f11e8a36a68c87fbde31ea3f2bbd12f3abd5a07efa71
   > Blocks: 1            Seconds: 116
   > contract address:    0x4183557586387afb89F493c1290cdfB5e202a780
   > block number:        9801384
   > block timestamp:     1615221848
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.494095447
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

   Replacing 'PPTWrapper'
   ----------------------
   > transaction hash:    0xe7be3639f17fedb209dd0351adabd51188e411f13a3852719661883ae9c659db
   > Blocks: 8            Seconds: 184
   > contract address:    0x4Ee5EDfC12474bEBe3A51375838d850fdf4898Ac
   > block number:        9801395
   > block timestamp:     1615222105
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.47929543
   > gas used:            601200 (0x92c70)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138276 ETH


   Replacing 'PXTWrapper'
   ----------------------
   > transaction hash:    0xddadd3cbbff7d945e518636d3df4021b5b8dc048f1fbdf7016344ee7eb6c3571
   > Blocks: 0            Seconds: 12
   > contract address:    0x63C07e89aed226A8a3657f5111a421C7e5451A18
   > block number:        9801397
   > block timestamp:     1615222137
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.46546783
   > gas used:            601200 (0x92c70)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138276 ETH


   Replacing 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x8ff671fcb38eb49830412cc41efa792ba8cdcb0c24263a9bd4a6933d0f6382e2
   > Blocks: 6            Seconds: 136
   > contract address:    0xC68E7C20468Dfd74Ae93910E45ce1718f778A300
   > block number:        9801405
   > block timestamp:     1615222297
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.458849373
   > gas used:            287759 (0x4640f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.006618457 ETH


   Replacing 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0x71653eb3335d642a74df32454ba2eaad319ffc2884ae2e69eabc14102fb23a4b
   > Blocks: 1            Seconds: 12
   > contract address:    0x8f7bd8D653c33CE0A7561b7b68834B0609FcA5E4
   > block number:        9801407
   > block timestamp:     1615222307
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.39163507
   > gas used:            2922361 (0x2c9779)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.067214303 ETH


   Replacing 'Executor'
   --------------------
   > transaction hash:    0x71b4708126a2f8b252eea031d4b68d09ef099167c6b740d1a1626a8153ec73d0
   > Blocks: 3            Seconds: 68
   > contract address:    0x1dD68717eedE961a0571B41367E5b74d4D66BeaD
   > block number:        9801412
   > block timestamp:     1615222371
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.350157468
   > gas used:            1803374 (0x1b846e)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.041477602 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.142965562 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.146841108 ETH


```