import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
    chain,
    configureChains,
    createClient,
    WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { injectedWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';


/* create configuration for Ethermint testnet */
const ethermint = {
    id: 9000,
    name: 'KingSuper Ethermint Celestia Rollup',
    network: 'kingsuper_9000-1',
    nativeCurrency: {
        decimals: 18,
        name: 'KingSuper',
        symbol: 'KS',
    },
    rpcUrls: {
        default: {
            http: ['https://ethermint-celestia-rollup.kingsuper.services'],
        },
    },
    testnet: true,
};

// remove chain.localhost or ethermint depending on which you want to connect to
const { chains, provider } = configureChains(
    // [chain.localhost, ethermint],
    [ethermint],
    [
        jsonRpcProvider({
            rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
        }),
    ]
    // [publicProvider()]
);

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ chains }),
            injectedWallet({ chains }),
        ],
    },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

const containerStyle = {
    // width: '1100px',
    // margin: '0 auto'
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <div style={containerStyle}>
                <App />
            </div>
        </RainbowKitProvider>
    </WagmiConfig>
)