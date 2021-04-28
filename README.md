# Populous Governance v2


## Ethereum (ropsten) test network deployment for Populous Governance smart contracts with automated migration scripts in required order - 28/04/2021

```
deployer/admin - 0xC6561dF9180a8863fA9a16aB376eFbca17166CF4


Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000 (0x7a1200)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x3887c03956ea628303e1531d501618cd683968524432bae611796d66a51049f6
   > Blocks: 2            Seconds: 32
   > contract address:    0xEEEe44a54322C85f0d47E116529817Cd4822f4A3
   > block number:        10130501
   > block timestamp:     1619608702
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.9560748439
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
   > transaction hash:    0x74f5bbf532ae9324370b1485734769b26240e4eed5463b43749680377e934aa8
   > Blocks: 1            Seconds: 8
   > contract address:    0x509E6ce34BFa35481A773e63bB48664C5fA0066E
   > block number:        10130505
   > block timestamp:     1619608730
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.9400784819
   > gas used:            649815 (0x9ea57)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.014945745 ETH


   Deploying 'MockPXT'
   -------------------
   > transaction hash:    0x4c79e1bfc81e1353be6fc4a6ddc123c1279285b8416559b6eb670ee6e6c872a5
   > Blocks: 1            Seconds: 8
   > contract address:    0xE6550a6E9a5344674df8d2E15274C6FF48B564aD
   > block number:        10130507
   > block timestamp:     1619608746
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.9251327369
   > gas used:            649815 (0x9ea57)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.014945745 ETH


   Deploying 'MockVotingToken'
   ---------------------------
   > transaction hash:    0xd82786f97d5c63dca66523d2c0f3722e8eef757783f9b509415dacdb04d8d231
   > Blocks: 1            Seconds: 48
   > contract address:    0x6588262dBbb156EbA902565ec1E6C6461C5F145f
   > block number:        10130510
   > block timestamp:     1619608767
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.9025444599
   > gas used:            982099 (0xefc53)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.022588277 ETH


   Deploying 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0xc2613996655c9c49f254fedf18baae38c5fb88c1ff425ea0dc132f9ab4a557fb
   > Blocks: 2            Seconds: 52
   > contract address:    0xac61dCE7c101dcab520b348EE9D788a5bc32e234
   > block number:        10130513
   > block timestamp:     1619608807
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.8925438299
   > gas used:            434810 (0x6a27a)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.01000063 ETH


   Deploying 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0x5c90b23ee2cc08ea1119d64d3f008ab0692058bab746f5495a6e8fbcf3011930
   > Blocks: 2            Seconds: 24
   > contract address:    0x8346420Af069bAdC169c157ADE0E004293D9fc97
   > block number:        10130516
   > block timestamp:     1619608862
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.8020169339
   > gas used:            3935952 (0x3c0ed0)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.090526896 ETH


   Deploying 'Executor'
   --------------------
   > transaction hash:    0xd457748a38b46fcc2bf80a16b2da0c6402e213cce4f8c759ff994cb1fcde0ebd
   > Blocks: 0            Seconds: 16
   > contract address:    0xFcdF845E95f57f1EB018f974a4225eD2a9AfD4aa
   > block number:        10130519
   > block timestamp:     1619608900
   > account:             0xC6561dF9180a8863fA9a16aB376eFbca17166CF4
   > balance:             6.7609076309
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