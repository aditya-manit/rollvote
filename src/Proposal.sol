// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Proposal {
    string public name;
    address public owner;

    uint private _proposalId;

    struct Proposal {
        uint id;
        string title;
        string description;
        uint yesVotes;
        uint noVotes;
        uint abstainVotes;
    }

    mapping(uint => Proposal) private idToProposal;
    mapping(address => bool) private hasVoted;

    event ProposalCreated(uint id, string title, string description);
    event VoteCast(uint id, string voteType, uint count);

    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }

    function createProposal(string memory title, string memory description) public onlyOwner {
        _proposalId = _proposalId + 1;
        Proposal storage proposal = idToProposal[_proposalId];
        proposal.id = _proposalId;
        proposal.title = title;
        proposal.description = description;
        emit ProposalCreated(_proposalId, title, description);
    }

    function vote(uint proposalId, string memory voteType) public {
        require(!hasVoted[msg.sender], "This address has already voted.");

        Proposal storage proposal = idToProposal[proposalId];

        if (keccak256(bytes(voteType)) == keccak256(bytes("yes"))) {
            proposal.yesVotes += 1;
        } else if (keccak256(bytes(voteType)) == keccak256(bytes("no"))) {
            proposal.noVotes += 1;
        } else if (keccak256(bytes(voteType)) == keccak256(bytes("abstain"))) {
            proposal.abstainVotes += 1;
        } else {
            revert("Invalid vote type.");
        }

        hasVoted[msg.sender] = true;
        emit VoteCast(proposalId, voteType, 1);
    }

    function fetchProposal(uint proposalId) public view returns(Proposal memory){
        return idToProposal[proposalId];
    }

    function fetchAllProposals() public view returns (Proposal[] memory) {
        uint itemCount = _proposalId;

        Proposal[] memory proposals = new Proposal[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Proposal storage currentItem = idToProposal[currentId];
            proposals[i] = currentItem;
        }
        return proposals;
    }

    function fetchVotes(uint proposalId) public view returns (uint yesVotes, uint noVotes, uint abstainVotes) {
        Proposal storage proposal = idToProposal[proposalId];
        return (proposal.yesVotes, proposal.noVotes, proposal.abstainVotes);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
