import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './css/Header.css';

const Header = () => {
    return (
        <div className="header">
            <div>
                <h1>Celestia Rollup Voting App</h1>
                <p>
                    Users can create new proposals to be voted on, one address can vote only once on a proposal.
                    Here are <a href="https://stakeking.notion.site/KingSuper-RollUp-Demo-Accounts-e5d48882dc914d9684eddd5cedb30dc7" target="_blank" rel="noopener noreferrer">some test accounts</a> users can use to interact with the dapp and pay gas fees.
                </p>
            </div>
            <div className="wallet-connect-heading">
                <ConnectButton />
            </div>
        </div>
    );
};

export default Header;
