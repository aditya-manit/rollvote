import React from 'react';
import './css/CreateProposalForm.css';
import '../App.css'


const CreateProposalForm = ({ setTitle, setContent, createPost }) => {
    return (
        <div className="form-container">
            <input
                placeholder="Proposal Name"
                onChange={(e) => setTitle(e.target.value)}
                className="input-style"
            />
            <textarea
                placeholder="Proposal Details"
                onChange={(e) => setContent(e.target.value)}
                className="textarea-style"
            />
            <button onClick={createPost} className="button-style">
                Create New Proposal
            </button>
        </div>
    );
};

export default CreateProposalForm;
