## Miso's contract Audit Analysis

msg.value in the loop cause repeat withdraw，(*3.5billion dollar*)

contract: [contract source code](https://etherscan.io/address/0x4c4564a1FE775D97297F9e3Dc2e762e0Ed5Dda0e#code)

blog: [relative blog](https://www.paradigm.xyz/2021/08/two-rights-might-make-a-wrong/)

## run
`yarn install`
`npx hardhat test` to run the test

check the test script in the path `./test/Lock.js`, you will find the process

task introduction

部署合约时，调用者有0个token，合约地址有5个token

业务逻辑是🐴：当调用者调用commitEth时，调用者会转移1wei到合约地址中，合约地址会转移1个token到调用者地址中

但实际情况是，调用者通过batch多次调用commitEth时，调用者只转移1wei到合约地址中，合约地址转移了5个token到调用者地址中

攻击者用1wei，挖走了合约中的5个token
