import React from 'react';
import './css/ProposalStatsCard.css'

const ProposalStatsCard = () => {
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
                        <td>Placeholder</td>
                    </tr>
                    <tr>
                        <td>No</td>
                        <td>Placeholder</td>
                    </tr>
                    <tr>
                        <td>Abstain</td>
                        <td>Placeholder</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProposalStatsCard;
