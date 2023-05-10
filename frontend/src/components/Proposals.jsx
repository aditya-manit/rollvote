
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const fetchPreview = async (hash) => {
    try {
        const endpoint = `http://cors-proxy.kingsuper.services/?targetApi=https://infura-ipfs.io/ipfs/${hash}`
        const response = await axios.get(endpoint);
        const text = response.data;
        const previewText = text.slice(0, 100); // Change this to adjust the preview length
        return previewText + '...';
    } catch (error) {
        console.error('Error fetching content from IPFS:', error);
        return 'Error fetching content';
    }
};



const Proposals = ({ posts, address }) => {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedPreviews = await Promise.all(
                posts.map(async (post) => await fetchPreview(post.content))
            );
            setPreviews(fetchedPreviews);
        })();
    }, [posts]);

    return (
        address && (
            <div>
                <div className="proposal-container">
                    {posts.map((post, index) => (
                        <div key={index} className="proposal-card">
                            <h2>
                                {post.id}. {post.title}
                            </h2>
                            <p>{previews[index]}</p>
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
