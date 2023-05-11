import React from 'react';
import './css/ProposalDetails.css'

const ProposalDetails = ({ title, proposalDescription, id }) => {
    return (
        <div className="proposal-page-left">
            <h2>{id}. {title}</h2>
            <p>{proposalDescription}</p>
        </div>
    );
};

export default ProposalDetails;
