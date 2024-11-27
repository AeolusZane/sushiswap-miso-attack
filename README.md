## Miso's Contract Audit Analysis

`msg.value` in the loop leads to repeated withdrawals, resulting in a potential loss of up to 3.5 billion dollars.

contract: [contract source code](https://etherscan.io/address/0x4c4564a1FE775D97297F9e3Dc2e762e0Ed5Dda0e#code)

blog: [relevant blog](https://www.paradigm.xyz/2021/08/two-rights-might-make-a-wrong/)

## Run
`yarn install`
`npx hardhat test` to run the test

Check the test script in the path `./test/Lock.js`, you will find the process.

## Task Description

When deploying the contract, the caller has 0 tokens, and the contract address has 5 tokens.

The business logic is: when the caller invokes `commitEth`, the caller transfers 1 wei to the contract address, and the contract address transfers 1 token to the caller's address.

However, in practice, when the caller repeatedly invokes `commitEth` using batch calls, the caller only transfers 1 wei to the contract address, but the contract address transfers 5 tokens to the caller's address.

The attacker used 1 wei to extract 5 tokens from the contract.
