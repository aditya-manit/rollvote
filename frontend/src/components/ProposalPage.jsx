import React, { useState } from 'react';
import './css/ProposalPage.css';
import '../App.css'
import ProposalDetails from './ProposalDetails';
import ProposalStatsCard from './ProposalStatsCard';
import VotingCard from './VotingCard';


const ProposalPage = ({ title, content, id }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVoteOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleVote = () => {
        // Add your voting logic here
        console.log(`Voted for: ${selectedOption}`);
    };

    return (
        <div className="proposal-page">
            <ProposalDetails title={title} content={content} id={id} />
            <div className="proposal-page-right">
                <ProposalStatsCard />
                <VotingCard />
            </div>
        </div>
    );
};

export default ProposalPage;
