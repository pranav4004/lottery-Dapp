import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import constants from './constants';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Home() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [contractInstance, setContractInstance] = useState(null);
    const [isOwnerConnected, setIsOwnerConnected] = useState(false);
    const [status, setStatus] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [players, setPlayers] = useState([]);
    const [currentWinner, setCurrentWinner] = useState("");
    const [hasEntered, setHasEntered] = useState(false); // State to track if the user has entered

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
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

                const prevWinner = await contractIns.getWinner();
                setCurrentWinner(prevWinner);

                const participants = await contractIns.getPlayers();
                setPlayers(participants);

                // Check if the user has already entered
                if (participants.includes(currentAccount)) {
                    setHasEntered(true);
                }

                if (prevWinner === currentAccount) {
                    setIsWinner(true);
                } else {
                    setIsWinner(false);
                }

                const manager = await contractIns.getManager();
                setIsOwnerConnected(manager.toLowerCase() === currentAccount.toLowerCase());
            } catch (err) {
                console.error('Error loading contract:', err);
            }
        };

        loadBlockchainData();
        if (currentAccount) {
            loadContract();
        }
    }, [currentAccount]);

    const enterLottery = async () => {
        if (contractInstance && !hasEntered) {
            const amountToSend = ethers.utils.parseEther('0.001');
            const tx = await contractInstance.enter({ value: amountToSend });
            await tx.wait();
            setHasEntered(true); // Update the state to indicate that the user has entered
        }
    };

    const claimPrize = async () => {
        if (contractInstance && isWinner) {
            const tx = await contractInstance.claimPrize();
            await tx.wait();
        }
    };

    const resetContract = async () => {
        if (contractInstance && isOwnerConnected) {
            try {
                const tx = await contractInstance.resetContract({ value: 0 });
                await tx.wait();
                alert('Contract reset successful!');
            } catch (error) {
                console.error('Error resetting contract:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="title" style={{color:'white '}}>Lottery dapp</h1>

            <div className="row">
                <div className="col">
                    {status ? (
                        isWinner ? (
                            <button className="btn btn-success" onClick={claimPrize}>Claim Prize</button>
                        ) : (
                            <p className="alert alert-warning mt-3">You are not the winner</p>
                        )
                    ) : (
                        hasEntered ? (
                            <p className="alert alert-info mt-3">You have already participated in the lottery</p>
                        ) : (
                            <button className="btn btn-primary" onClick={enterLottery}>Enter Lottery</button>
                        )
                    )}

                    {isOwnerConnected && (
                        <button className="btn btn-danger mt-0 ms-2" onClick={resetContract}>Reset Contract</button>
                    )}
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Participants</h2>
                            <ul className="list-group">
                                {players.map((participant, index) => (
                                    <li key={index} className="list-group-item">{participant}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Previous Winner</h2>
                            {currentWinner ? (
                                <p className="alert alert-success">{currentWinner}</p>
                            ) : (
                                <p className="alert alert-info">No previous winner</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
