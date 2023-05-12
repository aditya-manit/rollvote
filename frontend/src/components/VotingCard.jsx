import React, { useState } from 'react';
import './css/VotingCard.css'

const VotingCard = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVoteOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleVote = () => {
        // Add your voting logic here
        console.log(`Voted for: ${selectedOption}`);
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
            <button className="vote-button" onClick={handleVote}>Vote</button>
        </div>
    );

};

export default VotingCard;
