import React from 'react';
import './css/LoadingModal.css';


import { FaCheckCircle, FaTimesCircle, FaSpinner, FaPoop, FaRedo } from 'react-icons/fa';

import Spinner from './Spinner'; // assuming you have a Spinner component

const LoadingModal = ({transactionStatus, setIsLoading}) => {

    function closeModal() {
        setIsLoading(false);
        // window.location.reload();
    }

    return (
        <div className="modal">
            <div className="modal-content">
                {transactionStatus === 'Transaction successful!' ? <FaCheckCircle color="green" size="4em" />
                    : transactionStatus.includes('Transaction failed') ? <FaRedo color="blue" size="4em" />
                        : <Spinner />}

                <div className="transactionStatus">
                    <p>{transactionStatus}</p>
                </div>
                <button className="close-modal-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default LoadingModal;
