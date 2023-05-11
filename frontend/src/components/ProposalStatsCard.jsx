import React from 'react';
import './css/ProposalStatsCard.css'

const ProposalStatsCard = ({yesVotes, noVotes, abstainVotes}) => {
    return (
        <div className="vote-stats-card">
            <h3>Voting Stats</h3>
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Vote Options</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Yes</td>
                        <td>{yesVotes}</td>
                    </tr>
                    <tr>
                        <td>No</td>
                        <td>{noVotes}</td>
                    </tr>
                    <tr>
                        <td>Abstain</td>
                        <td>{abstainVotes}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProposalStatsCard;
