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
> Block gas limit: 8000029 (0x7a121d)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x0ebe0be46a3c12339cb27cad659fb9a5c291ece353684247ce0c1284e3bf5511
   > Blocks: 176          Seconds: 264
   > contract address:    0xfe8aC875D1522be7e08aA2C7395f5037Cd648d65
   > block number:        9904205
   > block timestamp:     1616664893
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.5082951609
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

   Replacing 'PPTWrapper'
   ----------------------
   > transaction hash:    0x07002def35a852510d1772270f7ab53322ff8c428ff049080fa678f8c819951c
   > Blocks: 0            Seconds: 0
   > contract address:    0xCd06b7d3edD8e7185E7757d89f829F183C3Bf228
   > block number:        9904209
   > block timestamp:     1616665065
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.4933870439
   > gas used:            602500 (0x93184)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138575 ETH


   Replacing 'PXTWrapper'
   ----------------------
   > transaction hash:    0xd567672a8779dc835edbb5ac8e90e3141811b638bbea92a43c3803f2aa05cf54
   > Blocks: 0            Seconds: 16
   > contract address:    0x7De8E0Ed49Ffe2512C42597D61623C7EcF3A9F49
   > block number:        9904210
   > block timestamp:     1616665072
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.4795295439
   > gas used:            602500 (0x93184)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138575 ETH


   Replacing 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x59ffbafc89d5c0c57885a818cf2140bd0a10a1b8a024ca5f71b80d2a96c493b3
   > Blocks: 1            Seconds: 116
   > contract address:    0xf59c6980A817760223d602654155B28A9c2E51Dd
   > block number:        9904212
   > block timestamp:     1616665206
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.4641706499
   > gas used:            667778 (0xa3082)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.015358894 ETH


   Replacing 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0xe80a0bf251092f51b02abc606facc2372a99ca52b1f98e4a436dff3e0d2ba4be
   > Blocks: 0            Seconds: 4
   > contract address:    0xf87Ce2272A4D55368f084A555EfEc23e736822f6
   > block number:        9904213
   > block timestamp:     1616665210
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.3968497189
   > gas used:            2926997 (0x2ca995)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.067320931 ETH


   Replacing 'Executor'
   --------------------
   > transaction hash:    0x6de291cb5e2bc4715c0a385588ccf4b9fcadaf03b57d280f77112abd6a2d4fd8
   > Blocks: 0            Seconds: 4
   > contract address:    0xBcA335D2342F9341cc743e599a4F0def52F15348
   > block number:        9904214
   > block timestamp:     1616665218
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             7.3552939169
   > gas used:            1806774 (0x1b91b6)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.041555802 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.151950627 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.155856073 ETH

```