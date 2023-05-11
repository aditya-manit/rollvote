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

const auth =
    'Basic ' + Buffer.from(import.meta.env.VITE_INFURA_ID + ':' + import.meta.env.VITE_INFURA_SECRET).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const contractAddress = '0x641a7e16042de68c630fd490d8f4b60bbf201c02'

function App() {
    useEffect(() => {
        fetchProposals()
    }, [])
    const [viewState, setViewState] = useState('view-proposals')
    const [proposals, setProposals] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {address} = useAccount();

    async function fetchProposals() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
        // todo: change it
        let data = await contract.fetchPosts()
        data = data.map(d => ({
            content: d['content'],
            title: d['title'],
            published: d['published'],
            id: d['id'].toString(),
        }))

        data = await Promise.all(data.map(async d => {
            const endpoint = `https://infura-ipfs.io/ipfs/${d.content}`
            const options = {
                mode: 'no-cors',
            }
            const response = await fetch(endpoint, options)
            const value = await response.text()
            d.proposalContent = value
            return d
        }))

        setProposals(data)
    }

    async function createProposal() {
        const added = await client.add(content)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(contractAddress, Blog.abi, signer)
        const tx = await contract.createProposal(title, added.path)
        await tx.wait()
        setViewState('view-proposals')
    }

    function toggleView(value) {
        setViewState(value)
        if (value === 'view-proposals') {
            fetchProposals()
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
                {viewState === 'view-proposals' && (
                    <Proposals
                        proposals={proposals}
                        address={address}
                        showProposalPage={showProposalPage}
                        setShowProposalPage={setShowProposalPage}
                    />
                )}
                {viewState === 'create-proposal' && (
                    <CreateProposalForm
                        setTitle={setTitle}
                        setContent={setContent}
                        createProposal={createProposal}
                    />
                )}
            </div>
        </div>
    );



}


export default App