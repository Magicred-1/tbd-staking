// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import {IAxelarGateway} from "../src/interfaces/IAxelarGateway.sol";

contract DeployTokens is Script {
    function run() public {
        address gateway = vm.envAddress("AXELAR_GATEWAY_ADDRESS");

        if (gateway == address(0)) {
            revert("AXELAR_GATEWAY_ADDRESS must be set.");
        }

        if (IAxelarGateway(gateway).governance() != msg.sender) {
            revert("Caller is not governance.");
        }

        vm.startBroadcast();

        IAxelarGateway(gateway).deployToken(
            abi.encode("Wrapped Ether", "WETH", "uweth", 18, 1e50, 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9, 1e50),
            bytes32(0)
        );

        IAxelarGateway(gateway).deployToken(
            abi.encode("Axelar Wrapped XRP", "axlXRP", "uxrp", 6, 1e50, address(0), 1e50),
            bytes32(0)
        );

        vm.stopBroadcast();
    }
}
