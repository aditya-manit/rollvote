import React from 'react';

import './css/ButtonContainer.css';
import '../App.css'

const ButtonContainer = ({ address, toggleView, setShowProposalPage }) => {

    const handleViewPostsClick = () => {
        setShowProposalPage(false);
        toggleView('view-posts');

    };

    return (
        address && (
            <div className="button-container">
                <button
                    onClick={handleViewPostsClick}
                    className="button-style"
                >
                    View Posts
                </button>
                <button
                    onClick={() => toggleView('create-post')}
                    className="button-style"
                >
                    Create New Proposal
                </button>
            </div>
        )
    );
};

export default ButtonContainer;
