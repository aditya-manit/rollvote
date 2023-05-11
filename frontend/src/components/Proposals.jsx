import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProposalPage from './ProposalPage.jsx';
import './css/Proposals.css';
import '../App.css'


const Proposals = ({proposals, address, showProposalPage, setShowProposalPage}) => {

    const [selectedProposal, setSelectedProposal] = useState({title: '', proposalDescription: '', id: '', yesVotes: '',noVotes: '', abstainVotes: '' });

    const handleVoteClick = (title, proposalDescription, id, yesVotes, noVotes, abstainVotes) => {
        setSelectedProposal({title, proposalDescription, id, yesVotes, noVotes, abstainVotes});
        setShowProposalPage(true);
    };

    return (
        address && (
            <div>
                {!showProposalPage && (
                    <div className="proposal-container">
                        {proposals.map((proposal, index) => (
                            <div key={index} className="proposal-card">
                                <h4>
                                    {proposal.id}. {proposal.title}
                                </h4>
                                <p>{proposal.proposalDescription.slice(0, 100)}.....</p>
                                <button
                                    className="vote-button"
                                    onClick={() => handleVoteClick(proposal.title, proposal.proposalDescription, proposal.id, proposal.yesVotes, proposal.noVotes, proposal.abstainVotes)}
                                >
                                    Vote
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {showProposalPage && (
                    <ProposalPage
                        title={selectedProposal.title}
                        proposalDescription={selectedProposal.proposalDescription}
                        id={selectedProposal.id}
                        yesVotes={selectedProposal.yesVotes}
                        noVotes={selectedProposal.noVotes}
                        abstainVotes={selectedProposal.abstainVotes}
                    />
                )}
            </div>
        )
    );
};


export default Proposals;
