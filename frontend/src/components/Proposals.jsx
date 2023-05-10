import React from 'react';

const Proposals = ({ posts, address }) => {
    return (
        address && (
            <div>
                <div className="proposal-container">
                    {posts.map((post, index) => (
                        <div key={index} className="proposal-card">
                            <h2>
                                {post.id}. {post.title}
                            </h2>
                            <button
                                className="read-on-ipfs"
                                onClick={() =>
                                    window.open(`https://infura-ipfs.io/ipfs/${post.content}`)
                                }
                            >
                                Read on IPFS
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default Proposals;
