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
            <div>
                <input type="radio" id="yes" name="vote" value="yes" onChange={handleVoteOptionChange} />
                <label htmlFor="yes">Yes</label>
            </div>
            <div>
                <input type="radio" id="no" name="vote" value="no" onChange={handleVoteOptionChange} />
                <label htmlFor="no">No</label>
            </div>
            <div>
                <input type="radio" id="abstain" name="vote" value="abstain" onChange={handleVoteOptionChange} />
                <label htmlFor="abstain">Abstain</label>
            </div>
            <button className="vote-button" onClick={handleVote}>Vote</button>
        </div>
    );
};

export default VotingCard;
