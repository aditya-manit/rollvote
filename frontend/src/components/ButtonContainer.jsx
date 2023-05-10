import React from 'react';

const ButtonContainer = ({ address, toggleView }) => {
    return (
        address && (
            <div className="button-container">
                <button
                    onClick={() => toggleView('view-posts')}
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
