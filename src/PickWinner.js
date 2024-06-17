import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import constants from './constants';

function PickWinner() {
    const [currentAccount, setCurrentAccount] = useState('');
    const [contractInstance, setContractInstance] = useState(null);
    const [isOwnerConnected, setIsOwnerConnected] = useState(false);
    const [winner, setWinner] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    console.log(address);
                    setCurrentAccount(address);

                    window.ethereum.on('accountsChanged', (accounts) => {
                        setCurrentAccount(accounts[0]);
                    });
                } catch (err) {
                    console.error(err);
                }
            } else {
                alert('Please install MetaMask to use this application');
            }
        };

        const loadContract = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contractIns = new ethers.Contract(constants.contractAddress, constants.contractAbi, signer);
                setContractInstance(contractIns);

                const contractStatus = await contractIns.status();
                setStatus(contractStatus);

                const owner = await contractIns.getManager();
                setIsOwnerConnected(owner.toLowerCase() === currentAccount.toLowerCase());

                const winnerAddress = await contractIns.getWinner();
                setWinner(winnerAddress);
            } catch (err) {
                console.error('Error loading contract:', err);
            }
        };

        loadBlockchainData();
        loadContract();
    }, [currentAccount]);

    const pickWinner = async () => {
        try {
            const tx = await contractInstance.pickWinner();
            await tx.wait();
            console.log('Winner picked successfully');
        } catch (err) {
            console.error('Error picking winner:', err);
        }
    };

    return (
        <div className='container'>
            <h1 style={{color:'white'}}>Result Page</h1>
            <div className='button-container'>
                {status ? (
                    <p style={{color:'white'}}>Lottery Winner is: {winner}</p>
                ) : (
                    isOwnerConnected ? (
                        <button className='enter-button' onClick={pickWinner}>Pick Winner</button>
                    ) : (
                        <p style={{color:'white'}}>You are not the owner</p>
                    )
                )}
            </div>
        </div>
    );
}

export default PickWinner;
