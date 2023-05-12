import React, { useState } from 'react';
import './css/VotingCard.css'

const VotingCard = ({id, voteOnProposal}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVoteOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="vote-options-card">
            <h3>Vote Options</h3>
            <label htmlFor="yes" className="option-container">
                <input type="radio" id="yes" name="vote" value="yes" onChange={handleVoteOptionChange} />
                Yes
            </label>
            <label htmlFor="no" className="option-container">
                <input type="radio" id="no" name="vote" value="no" onChange={handleVoteOptionChange} />
                No
            </label>
            <label htmlFor="abstain" className="option-container">
                <input type="radio" id="abstain" name="vote" value="abstain" onChange={handleVoteOptionChange} />
                Abstain
            </label>
            <button className="vote-button" onClick={() => voteOnProposal(id, selectedOption)}>Vote</button>
        </div>
    );

};

export default VotingCard;
