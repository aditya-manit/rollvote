// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Proposal.sol";

contract ProposalTest is Test {
    Proposal proposal;

    function setUp() public {
        proposal = new Proposal("Celestia Proposal");
    }

    function testCreateProposal() public {
        proposal.createProposal("My first proposal", "This is a description.");
        Proposal.Proposal memory p = proposal.fetchProposal(1);
        assertEq(p.id, 1);
        assertEq(p.title, "My first proposal");
        assertEq(p.description, "This is a description.");
    }

    function testVote() public {
        proposal.createProposal("My first proposal", "This is a description.");

        proposal.vote(1, "yes");
        Proposal.Proposal memory p = proposal.fetchProposal(1);
        assertEq(p.yesVotes, 1);

        proposal.vote(1, "no");
        p = proposal.fetchProposal(1);
        assertEq(p.noVotes, 1);

        proposal.vote(1, "abstain");
        p = proposal.fetchProposal(1);
        assertEq(p.abstainVotes, 1);
    }

    function testFetchAllProposals() public {
        proposal.createProposal("My first proposal", "This is a description.");
        proposal.createProposal("My second proposal", "This is another description.");

        Proposal.Proposal[] memory proposals = proposal.fetchAllProposals();
        assertEq(proposals.length, 2);
        assertEq(proposals[0].title, "My first proposal");
        assertEq(proposals[1].title, "My second proposal");
    }

    function testOnlyOwner() public {
        address bob = address(0x1);
        vm.startPrank(bob);
        vm.expectRevert();
        proposal.createProposal("My first proposal", "This is a description.");
    }
}
