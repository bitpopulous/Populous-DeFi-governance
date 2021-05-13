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

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xb2e9f3dd81d5bb7034156de6295ce9de5a56d2a0bb38a868c6a75bb3fd8af3df
   > Blocks: 2            Seconds: 8
   > contract address:    0xed19f4471cB2C26baA3497A1991803bb29ae1D4C
   > block number:        10190030
   > block timestamp:     1620384121
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.313908817
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

   Replacing 'MockPPT'
   -------------------
   > transaction hash:    0x3cd736fbe1e8c833ca3deff6d9d8188044a3de85573b792af7171f77b311e3ea
   > Blocks: 2            Seconds: 24
   > contract address:    0xa22eB8273fd61790cE99c5e35eBcC8a415883536
   > block number:        10190033
   > block timestamp:     1620384175
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.297912455
   > gas used:            649815 (0x9ea57)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.014945745 ETH


   Replacing 'MockPXT'
   -------------------
   > transaction hash:    0xeb223c7002f8f4ae295ee403981606d176e97fba7a84fa0d5a997716bd04c06c
   > Blocks: 1            Seconds: 4
   > contract address:    0x6388Cb21d6e0C1C12E98266CbF7D7FC853009c4f
   > block number:        10190036
   > block timestamp:     1620384202
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.28296671
   > gas used:            649815 (0x9ea57)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.014945745 ETH


   Replacing 'MockVotingToken'
   ---------------------------
   > transaction hash:    0x437dbfa9dc156631e913628c85539997b560c3ffcd10e1e38ffbacb568c50849
   > Blocks: 1            Seconds: 32
   > contract address:    0x76642782C2C34492279281C25efe041bEC0d48be
   > block number:        10190038
   > block timestamp:     1620384206
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.260378433
   > gas used:            982099 (0xefc53)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.022588277 ETH


   Replacing 'GovernanceStrategy'
   ------------------------------
   > transaction hash:    0x5bd200e044873b2721b0e60c161c5d993b8c298cfb21eb099cc5ad7f17950d80
   > Blocks: 2            Seconds: 56
   > contract address:    0x5f36b394bFd7abb9c02Bb7083cb1C6e4497579dD
   > block number:        10190041
   > block timestamp:     1620384289
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.250378079
   > gas used:            434798 (0x6a26e)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.010000354 ETH


   Replacing 'PopulousGovernanceV2'
   --------------------------------
   > transaction hash:    0xf646f1343e9902d748e4813e592f838855cd25b00a4f8e8fc26515c30f021e91
   > Blocks: 0            Seconds: 12
   > contract address:    0x699932b069e934029646b553d0B6453887dD6fC8
   > block number:        10190042
   > block timestamp:     1620384301
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.159781447
   > gas used:            3938984 (0x3c1aa8)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.090596632 ETH


   Replacing 'Executor'
   --------------------
   > transaction hash:    0x927a9ace02d894b865400c9917790cc9de3459731c8953c7c746e19d7fd6a001
   > Blocks: 3            Seconds: 16
   > contract address:    0x713EF67091DF85345c3aA6D61435C5f96E64E157
   > block number:        10190048
   > block timestamp:     1620384392
   > account:             0x614b32516601b7C424d0B284B498D5E14323ED3A
   > balance:             1.118671868
   > gas used:            1741167 (0x1a916f)
   > gas price:           23 gwei
   > value sent:          0 ETH
   > total cost:          0.040046841 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.193123594 ETH


Summary
=======
> Total deployments:   7
> Final cost:          0.19702904 ETH


```



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