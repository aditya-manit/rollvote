import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './css/Header.css';

const Header = () => {
    return (
        <div className="header">
            <div>
                <h1>Celestia Rollup Voting App</h1>
                <p>
                    This allows users to securely create and share blog posts on the
                    blockchain without the need for a centralized server or
                    authority.
                </p>
            </div>
            <div className="wallet-connect-heading">
                {<ConnectButton />}
            </div>
        </div>
    );
};

export default Header;
