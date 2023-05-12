import React from 'react';
import './css/ProposalDetails.css';
import ReactMarkdown from 'react-markdown';

const ProposalDetails = ({ title, proposalDescription, id }) => {
    return (
        <div className="proposal-page-left">
            <h2>{id}. {title}</h2>
            <hr />
            <ReactMarkdown children={proposalDescription} />
        </div>
    );
};

export default ProposalDetails;
