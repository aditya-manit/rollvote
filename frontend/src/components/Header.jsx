import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './css/Header.css';

const Header = () => {
    return (
        <div className="header">
            <div>
                <h1>Celestia Rollup Voting App</h1>
                <p>
                    Users can create new proposals to be voted on, one address can vote only once on a proposal
                </p>
            </div>
            <div className="wallet-connect-heading">
                {<ConnectButton />}
            </div>
        </div>
    );
};

export default Header;
