// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Proposal} from "src/Proposal.sol";

contract ProposalScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new Proposal("Celestia Proposal");
        vm.stopBroadcast();
    }
}
