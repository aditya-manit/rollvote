import React, {useState} from 'react';
import './css/CreateProposalForm.css';
import '../App.css';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMarkdown from 'react-markdown';

const CreateProposalForm = ({address, title, setTitle, description, setDescription, createProposal}) => {
    const [selectedTab, setSelectedTab] = useState('write');

    return (
        address && (<div className="form-container">
            <div className="input-container">
                <input
                    placeholder="Proposal Name"
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-style"
                />
                <ReactMde
                    value={description}
                    onChange={setDescription}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(<ReactMarkdown children={markdown}/>)
                    }
                />
                <button onClick={createProposal} className="button-style">
                    Create New Proposal
                </button>
            </div>
            <div className="preview-container">
                {(title || description) ? (
                    <>
                        {title && <h1>{title}</h1>}
                        {description && <ReactMarkdown children={description}/>}
                    </>
                ) : (
                    <p>
                        <center>Proposal Preview will be displayed here.....</center>
                    </p>
                )}
            </div>
        </div>)
    );
};

export default CreateProposalForm;
