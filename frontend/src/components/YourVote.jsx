import React from 'react';
import './css/YourVote.css';

const YourVote = ({ userVote }) => {
    return (
        <div className="your-vote-card">
            <h2>Your Vote</h2>
            <div className="vote-display">
                <p>{userVote}</p>
            </div>
        </div>
    );
};

export default YourVote;
