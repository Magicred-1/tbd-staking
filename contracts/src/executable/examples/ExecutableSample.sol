// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { AxelarExecutable } from '../AxelarExecutable.sol';
import { IAxelarGateway } from '../../interfaces/IAxelarGateway.sol';

contract ExecutableSample is AxelarExecutable {
    string public sourceChain;
    string public sourceAddress;
    string public message;
    string public tokenDenom;
    uint256 public tokenAmount;

    event Executed(string _sourceChain, string _sourceAddress, string _message, string _tokenSymbol, uint256 _tokenAmount);

    constructor(address gateway_) AxelarExecutable(gateway_) {
    }

    function _execute(
        string calldata sourceChain_,
        string calldata sourceAddress_,
        bytes calldata payload_
    ) internal override {
        bytes memory gmpPayload;
        (tokenDenom, tokenAmount, gmpPayload) = abi.decode(payload_, (string, uint256, bytes));
        (message) = abi.decode(gmpPayload, (string));
        sourceChain = sourceChain_;
        sourceAddress = sourceAddress_;

        emit Executed(sourceChain, sourceAddress, message, IAxelarGateway(gateway).tokenSymbol(tokenDenom), tokenAmount);
    }
}
