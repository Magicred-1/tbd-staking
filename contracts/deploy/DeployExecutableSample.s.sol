// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/executable/examples/ExecutableSample.sol";

contract DeployExecutableSample is Script {
    function run() public {
        address gateway = vm.envAddress("AXELAR_GATEWAY_ADDRESS");

        if (gateway == address(0)) {
            revert("AXELAR_GATEWAY_ADDRESS must be set.");
        }

        vm.startBroadcast();

        ExecutableSample executableSample = new ExecutableSample(gateway);
        console.log("ExecutableSample deployed to:", address(executableSample));

        vm.stopBroadcast();
    }
}
