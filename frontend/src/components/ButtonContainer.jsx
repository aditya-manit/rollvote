import React from 'react';

import './css/ButtonContainer.css';
import '../App.css'

const ButtonContainer = ({ address, toggleView, setShowProposalPage }) => {

    const handleViewProposalsClick = () => {
        setShowProposalPage(false);
        toggleView('view-proposals');
    };

    return (
        address && (
            <div className="button-container">
                <button
                    onClick={handleViewProposalsClick}
                    className="button-style"
                >
                    View Proposals
                </button>
                <button
                    onClick={() => toggleView('create-proposal')}
                    className="button-style"
                >
                    Create New Proposal
                </button>
            </div>
        )
    );
};

export default ButtonContainer;
