import React from 'react';
import './css/ProposalDetails.css'

const ProposalDetails = ({ title, content, id }) => {
    return (
        <div className="proposal-page-left">
            <h2>{id}. {title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default ProposalDetails;
