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
   > transaction hash:    0xfd8ed01225ebbecbee55142e443ed80fb125dfb69e67464e23119c733bf0a63b
   > Blocks: 2            Seconds: 28
   > contract address:    0xF43Bb8212a04f7Cb769B00f81a3c2c6A65a8957D
   > block number:        9730930
   > block timestamp:     1614261348
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.896839201
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
   > transaction hash:    0x11870486dbd856dec6f76044ce174766bbea41657e19e16e94f9a07ff7975f30
   > Blocks: 2            Seconds: 8
   > contract address:    0xDF328650d5f0C2fA00C30f129fD63B22E94e6F08
   > block number:        9730934
   > block timestamp:     1614261399
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.882039184
   > gas used:            601200 (0x92c70)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138276 ETH


   Deploying 'PXTWrapper'
   ----------------------
   > transaction hash:    0x80c1aa9464bd8084498d375b8bd441061adf7ce26f45b15fdbc93fa898a35502
   > Blocks: 0            Seconds: 12
   > contract address:    0xdC25F7fe2e582176F68df1CabD1FbF67a470f1cB
   > block number:        9730937
   > block timestamp:     1614261410
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.868211584
   > gas used:            601200 (0x92c70)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.0138276 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x921366e04533ca4fc22453b317fae8fea4c6a8cfc88b0366faa49ad01c00db0b
   > Blocks: 2            Seconds: 16
   > contract address:    0xAcFF0DFcCA79473A8c14C554003D728d4a0c9F21
   > block number:        9730939
   > block timestamp:     1614261430
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.861593403
   > gas used:            287747 (0x46403)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.006618181 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0x36c7ac4fcc1fe001be05ff6ec05c0c97b6397a7af4f3d55ccbb3df68f9c0f330
   > Blocks: 2            Seconds: 8
   > contract address:    0x24bB56b44612eE314275401ba4C65198806730B0
   > block number:        9730941
   > block timestamp:     1614261452
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.7943791
   > gas used:            2922361 (0x2c9779)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.067214303 ETH


   Deploying 'Executor'
   --------------------
   > transaction hash:    0xd6cf4db925b82e5fabe37652a34c53103b72c603b97b0f13b07a8434ca0f467d
   > Blocks: 1            Seconds: 16
   > contract address:    0xc1aFfaa69676a83E966f0E26D7a7092dA1d0dB7d
   > block number:        9730944
   > block timestamp:     1614261474
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             8.752901498
   > gas used:            1803374 (0x1b846e)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.041477602 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.142965286 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.146840832 ETH



```