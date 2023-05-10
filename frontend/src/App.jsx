import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import Blog from '../Blog.json'
import { useAccount } from "wagmi";
import './App.css'

/* configure authorization for Infura and IPFS */
const auth =
    'Basic ' + Buffer.from(import.meta.env.VITE_INFURA_ID + ':' + import.meta.env.VITE_INFURA_SECRET).toString('base64');

/* create an IPFS client */
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

function App() {
    useEffect(() => {
        fetchPosts()
    }, [])
    const [viewState, setViewState] = useState('view-posts')
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { address } = useAccount();

    /* when the component loads, useEffect will call this function */
    async function fetchPosts() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
        let data = await contract.fetchPosts()
        /* once the data is returned from the network we map over it and */
        /* transform the data into a more readable format  */
        data = data.map(d => ({
            content: d['content'],
            title: d['title'],
            published: d['published'],
            id: d['id'].toString(),
        }))

        /* we then fetch the post content from IPFS and add it to the post objects */
        data = await Promise.all(data.map(async d => {
            const endpoint = `https://infura-ipfs.io/ipfs/${d.content}`
            const options = {
                mode: 'no-cors',
            }
            const response = await fetch(endpoint, options)
            const value = await response.text()
            d.postContent = value
            return d
        }))

        setPosts(data)
    }

    async function createPost() {
        const added = await client.add(content)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, Blog.abi, signer)
        const tx = await contract.createPost(title, added.path)
        await tx.wait()
        setViewState('view-posts')
    }

    function toggleView(value) {
        setViewState(value)
        if (value === 'view-posts') {
            fetchPosts()
        }
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <h1>Modular Rollup Blog</h1>
                <p>This allows users to securely create and share blog posts on the blockchain without the need for a centralized server or authority.</p>
                {!address ? (
                    <div>
                        <h3>Getting Started</h3>
                        <p>First, you will need to connect your Ethereum wallet to Ethermint to display the posts from the smart contract and make posts.</p>
                    </div>
                ) : null}
                <br />
                <h3 className="wallet-connect-heading">Connect your Ethereum wallet to begin ✨</h3>
                <div className="button-container">
                    <ConnectButton />
                </div>
                {address ? (
                    <div className="button-container">
                        <button onClick={() => toggleView('view-posts')} className="button-style">View Posts</button>
                        <button onClick={() => toggleView('create-post')} className="button-style">Create Post</button>
                    </div>
                ) : null}
                {
                    viewState === 'view-posts' && address && (
                        <div>
                            <div className="post-container">
                                <h1>Posts</h1>
                                {
                                    posts.map((post, index) => (
                                        <div key={index}>
                                            <h2>{post.title}</h2>
                                            <button className="read-on-ipfs" onClick={() => window.open(`https://infura-ipfs.io/ipfs/${post.content}`)}>Read on IPFS</button>
                                            {
                                                //                          <ReactMarkdown>
                                                //   {post.postContent}
                                                // </ReactMarkdown>
                                            }
                                            <p className="mbid-style">GMID: {post.id}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    viewState === 'create-post' && (
                        <div className="form-container">
                            <h2>Create Post</h2>
                            <input
                                placeholder='Title'
                                onChange={e => setTitle(e.target.value)}
                                className="input-style"
                            />
                            <textarea
                                placeholder='Content'
                                onChange={e => setContent(e.target.value)}
                                className="input-style"
                            />
                            <button onClick={createPost} className="button-style">Create Post</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default App