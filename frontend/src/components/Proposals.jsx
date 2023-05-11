import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProposalPage from './ProposalPage.jsx';
import './css/Proposals.css';
import '../App.css'



const fetchPreview = async (hash) => {
    try {
        const endpoint = `http://cors-proxy.kingsuper.services/?targetApi=https://infura-ipfs.io/ipfs/${hash}`
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching content from IPFS:', error);
        return 'Error fetching content';
    }
};




const Proposals = ({ proposals, address, showProposalPage, setShowProposalPage }) => {

    const [selectedProposal, setSelectedProposal] = useState({ title: '', content: '', id: '' });

    const handleVoteClick = (title, content, id) => {
        setSelectedProposal({ title, content, id });
        setShowProposalPage(true);
    };

    const [contents, setContents] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedContents = await Promise.all(
                proposals.map(async (proposal) => await fetchPreview(proposal.content))
            );
            setContents(fetchedContents);
        })();
    }, [proposals]);


    return (
        address && (
            <div>
                {!showProposalPage && (
                    <div className="proposal-container">
                        {proposals.map((proposal, index) => (
                            <div key={index} className="proposal-card">
                                <h2>
                                    {proposal.id}. {proposal.title}
                                </h2>
                                <p>{contents[index]?.slice(0, 100)}.....</p>
                                <button
                                    className="vote-button"
                                    onClick={() => handleVoteClick(proposal.title, contents[index], proposal.id)}
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
                        content={selectedProposal.content}
                        id={selectedProposal.id}
                    />
                )}
            </div>
        )
    );

};


export default Proposals;
