import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import axios from 'axios';
import Blog from '../Blog.json'
import Proposal from '../Proposal.json'
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

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

function App() {
    useEffect(() => {
        fetchProposals()
    }, [])
    const [viewState, setViewState] = useState('view-proposals')
    const [proposals, setProposals] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {address} = useAccount();

    async function fetchProposals() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, Proposal.abi, provider)
        let data = await contract.fetchAllProposals()

        data = data.map(d => ({
            id: d['id'].toString(),
            title: d['title'],
            description: d['description'],
            yesVotes: d['yesVotes'].toString(),
            noVotes: d['noVotes'].toString(),
            abstainVotes: d['abstainVotes'].toString(),
        }))

        data = await Promise.all(data.map(async d => {

            try {
                const endpoint = `http://cors-proxy.kingsuper.services/?targetApi=https://infura-ipfs.io/ipfs/${d.description}`
                const response = await axios.get(endpoint);
                d.proposalDescription = response.data
                d.userVote = await contract.getVote(parseInt(d.id), address)
                return d
            } catch (error) {
                console.error('Error fetching description from IPFS:', error);
                d.proposalDescription = 'Error fetching description'
                d.userVote = 'Could not Load Vote'
                return d
            }
        }))

        console.log('data', data)
        setProposals(data)
    }

    async function createProposal() {
        console.log(`creating proposal with title ${title} and description ${description}`)
        const added = await client.add(description)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log('added.path: ', added.path)
        const contract = new ethers.Contract(contractAddress, Proposal.abi, signer)
        const tx = await contract.createProposal(title, added.path)
        await tx.wait()
        setViewState('view-proposals')
    }



    async function voteOnProposal(proposalId, voteOption) {
        console.log(`Voting on proposal with id ${proposalId} and vote option ${voteOption}`)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Proposal.abi, signer)
        const tx = await contract.vote(proposalId, voteOption)
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
                <Header/>
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
                        voteOnProposal={voteOnProposal}
                    />
                )}
                {viewState === 'create-proposal' && (
                    <CreateProposalForm
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        createProposal={createProposal}
                    />
                )}
            </div>
        </div>
    );

}


export default App