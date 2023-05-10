export async function addNetworkToMetaMask() {
    try {
        // Check if the MetaMask extension is installed
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use this feature.');
            return;
        }

        // Define the custom network configuration
        const network = {
            chainId: '9000', // The chain ID as a hexadecimal string (e.g., '0x1' for Ethereum Mainnet)
            chainName: 'KingSuper Celestia Rollup', // The name of the network
            nativeCurrency: {
                name: 'Custom Token',
                symbol: 'CTK', // The token symbol (e.g., 'ETH' for Ethereum)
                decimals: 18, // The number of decimals for the token
            },
            rpcUrls: ['http://65.109.160.193:8545/'], // The RPC URL for the network
            blockExplorerUrls: [], // The block explorer URL for the network (optional)
        };

        // Add the custom network to MetaMask
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
        });

        console.log('Custom network added to MetaMask');
    } catch (error) {
        console.error('Error adding custom network:', error);
        alert('Please switch the network to celestia rollup, refresh to try again');
    }
}

// export default addNetworkToMetaMask()