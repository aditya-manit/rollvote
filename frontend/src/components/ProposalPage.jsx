import React, {useState} from 'react';
import './css/ProposalPage.css';
import '../App.css'
import ProposalDetails from './ProposalDetails';
import ProposalStatsCard from './ProposalStatsCard';
import VotingCard from './VotingCard';
import YourVote from "./YourVote.jsx";


const ProposalPage = ({title, proposalDescription, id, yesVotes, noVotes, abstainVotes, voteOnProposal, userVote}) => {
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
            <ProposalDetails title={title} proposalDescription={proposalDescription} id={id}/>
            <div className="proposal-page-right">
                <ProposalStatsCard
                    yesVotes={yesVotes}
                    noVotes={noVotes}
                    abstainVotes={abstainVotes}
                />
                <VotingCard
                    id={id}
                    voteOnProposal={voteOnProposal}
                />
                <YourVote
                    userVote={userVote}
                />

            </div>
        </div>
    );
};

export default ProposalPage;
