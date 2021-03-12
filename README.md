# Populous Governance v2


## Ethereum (ropsten) test network deployment for Populous governance smart contracts with automated migration scripts in required order - 08/03/2021

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






## Ethereum (ropsten) test network deployment for Populous governance smart contracts with automated migration scripts in required order - 12/03/2021

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
   > transaction hash:    0x42104ec662f6ebe1a789dbb475998fe306a887ee1714a8030edfaf6ab28b3ff8
   > Blocks: 1            Seconds: 12
   > contract address:    0xDBb1fe26757DfDF103E0a7F3e4e0A3CE849B7443
   > block number:        9823223
   > block timestamp:     1615568418
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.6712031719
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
   > transaction hash:    0xd66059fadd4ad50bc5fd63b193282b30e63e7e562574e791480e935d9e3f7982
   > Blocks: 2            Seconds: 4
   > contract address:    0xC3a19D7540F2872B3aD29Ca2E4C335b0eb2aC42c
   > block number:        9823227
   > block timestamp:     1615568459
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.6562950549
   > gas used:            602500 (0x93184)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138575 ETH


   Deploying 'PXTWrapper'
   ----------------------
   > transaction hash:    0x193f746a8ddc2ac165b0dae8982629d9a2af47cf4e1c8761278312a5d515fdbf
   > Blocks: 2            Seconds: 36
   > contract address:    0xfac4342d729fBDc1501A47A9acd818aE254a5FD3
   > block number:        9823229
   > block timestamp:     1615568485
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.6424375549
   > gas used:            602500 (0x93184)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138575 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x65adbec079f1178d0b548ddd2f72ca3a0e9e9b166d13213fff2830d6178e147b
   > Blocks: 0            Seconds: 16
   > contract address:    0x6827AaeF25002dd416dc64FEa80445914A6a8cb3
   > block number:        9823231
   > block timestamp:     1615568503
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.6270786609
   > gas used:            667778 (0xa3082)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.015358894 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0xf76bd5449f041539f6e61c6a9f461e835a92ed8cab4a86b33a37164291b89db6
   > Blocks: 1            Seconds: 8
   > contract address:    0x90ab7B9732EA04404B779b4470cF22402cC030be
   > block number:        9823233
   > block timestamp:     1615568526
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.5597580059
   > gas used:            2926985 (0x2ca989)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.067320655 ETH


   Deploying 'Executor'
   --------------------
   > transaction hash:    0x75d0fba50011a3b9b410e7cc95b27fd1d1c0d52757640e2f80a4cbc0449de035
   > Blocks: 1            Seconds: 8
   > contract address:    0x99F3083f101e0BAb8AdCf10e6b620388C5f1AC23
   > block number:        9823235
   > block timestamp:     1615568535
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.5182022039
   > gas used:            1806774 (0x1b91b6)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.041555802 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.151950351 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.155855797 ETH

```