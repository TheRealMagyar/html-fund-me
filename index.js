//import { ethers } from "./ethers-5.6.esm.min";

import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constans.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect; // a js végzi a munkát ha gombra nyomunk és úgy futtatja a scriptet
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("connected!");
        connectButton.innerHTML = "Connected!";
    } else {
        connectButton.innerHTML = "Please install Metamask!";
    }
}

//getBalance function
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance));
    }
}

//fund function
async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}`);
    if (typeof window.ethereum !== "undefined") {
        //provider / connection to the blockchain
        //signer / wallet / someone with some gas
        //contract that we are interacting with
        //ABI & address
        const provider = new ethers.providers.Web3Provider(window.ethereum); //chain rpc
        const signer = provider.getSigner(); // metamask connected account
        try {
            const contract = new ethers.Contract(contractAddress, abi, signer); //lekéri a deployolt contractot h interactoljunk vele
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            //hey, wait for this TX to finish
            await listenForTransactionMine(transactionResponse, provider);
            console.log("Done!");
        } catch (error) {
            console.log(error);
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining: ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`,
            );
            resolve();
        });
    });
    // listen for the transaction to be finished
}

//withdraw
async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log("Withdrawing...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMine(transactionResponse, provider);
        } catch (error) {
            console.log;
        }
    }
}
