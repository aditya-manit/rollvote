import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProposalPage from './ProposalPage.jsx';
import './css/Proposals.css';
import '../App.css'



const fetchPreview = async (hash) => {
    try {
        const endpoint = `http://cors-proxy.kingsuper.services/?targetApi=https://infura-ipfs.io/ipfs/${hash}`
        const response = await axios.get(endpoint);
        const text = response.data;
        const previewText = text
        return previewText
    } catch (error) {
        console.error('Error fetching content from IPFS:', error);
        return 'Error fetching content';
    }
};




const Proposals = ({ posts, address, showProposalPage, setShowProposalPage }) => {

    const [selectedProposal, setSelectedProposal] = useState({ title: '', content: '', id: '' });

    const handleVoteClick = (title, content, id) => {
        setSelectedProposal({ title, content, id });
        setShowProposalPage(true);
    };

    const [contents, setContents] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedContents = await Promise.all(
                posts.map(async (post) => await fetchPreview(post.content))
            );
            setContents(fetchedContents);
        })();
    }, [posts]);


    return (
        address && (
            <div>
                {!showProposalPage && (
                    <div className="proposal-container">
                        {posts.map((post, index) => (
                            <div key={index} className="proposal-card">
                                <h2>
                                    {post.id}. {post.title}
                                </h2>
                                <p>{contents[index]?.slice(0, 100)}.....</p>
                                <button
                                    className="vote-button"
                                    onClick={() => handleVoteClick(post.title, contents[index], post.id)}
                                >
                                    Vote
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {showProposalPage && (
                    <ProposalPage
                        title={selectedProposal.title}
                        content={selectedProposal.content}
                        id={selectedProposal.id}
                    />
                )}
            </div>
        )
    );

};

export default Proposals;
