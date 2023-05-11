import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import Blog from '../Blog.json'
import {useAccount} from "wagmi";
import './App.css'
import Header from './components/Header.jsx';
import ButtonContainer from './components/ButtonContainer.jsx';
import Proposals from './components/Proposals.jsx';
import CreateProposalForm from './components/CreateProposalForm.jsx';

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

// const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const contractAddress = '0x641a7e16042de68c630fd490d8f4b60bbf201c02'

function App() {
    useEffect(() => {
        fetchPosts()
    }, [])
    const [viewState, setViewState] = useState('view-posts')
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {address} = useAccount();

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

    const [showProposalPage, setShowProposalPage] = useState(false);

    return (
        <div className="outer-container">
            <div className="inner-container">
                <Header />
                <ButtonContainer
                    address={address}
                    toggleView={toggleView}
                    setShowProposalPage={setShowProposalPage}
                />
                {viewState === 'view-posts' && (
                    <Proposals
                        posts={posts}
                        address={address}
                        showProposalPage={showProposalPage}
                        setShowProposalPage={setShowProposalPage}
                    />
                )}
                {viewState === 'create-post' && (
                    <CreateProposalForm
                        setTitle={setTitle}
                        setContent={setContent}
                        createPost={createPost}
                    />
                )}
            </div>
        </div>
    );


}


export default App