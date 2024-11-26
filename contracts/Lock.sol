// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";
library Sub {
    function sub(uint a, uint b) internal pure returns (uint c) {
        require((c = a - b) <= a, "BoringMath: Underflow");
    }
}

contract Lock is ERC20 {
    using Sub for uint;
    constructor(uint initial) ERC20("Lock", "LOCK") {
        _mint((address(this)), initial);
    }

    function batch(
        bytes[] calldata calls
    )
        external
        payable
        returns (bool[] memory successes, bytes[] memory results)
    {
        successes = new bool[](calls.length);
        results = new bytes[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(
                calls[i]
            );
            successes[i] = success;
            results[i] = result;
        }
    }

    function commitEth() external payable {
        console.log("msg.value: %s", msg.value);
        // 每次买value个代币
        uint ethToTransfer = msg.value;
        // 退回的钱
        uint ethToRefund = msg.value.sub(ethToTransfer);

        // 转账
        if (ethToTransfer > 0) {
            _addCommitment(ethToTransfer);
        }

        // 多的退回
        if (ethToRefund > 0) {
            payable(msg.sender).transfer(ethToRefund);
        }
    }

    function _addCommitment(uint256 amount) internal {
        // 代币转账
        _transfer(address(this), msg.sender, amount);
    }
}
