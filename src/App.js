import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import files from "./fakeFile";
import { ethers } from "ethers";
import { CONSTANTS } from "./constants";

const App = () => {
    const [currentAccount, setCurrentAccount] = useState();
    const [data, setData] = useState([]);
    let ethereum
    if (typeof window.ethereum !== "undefined" || (typeof window.web3 !== "undefined")) {
        ethereum = window.ethereum
     }
     

    const [contract, setContract] = useState({});

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            console.log("MetaMask is installed!");
        } else {
            alert("Please Install Metamask");
        }

        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (addressArray.length > 0) {
                setCurrentAccount(addressArray[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const payload = {
        uid: `${Date.now()}`,
        name: files[0].title,
        url: files[0].fileUrl,
        thumbnail: files[0].imageUrl,
    };

    useEffect(() => {
        if (ethereum) {
            (async () => {
                // await callFunc();
                // await redeemFunction();
                // await enterMarket();
                // await getAccountLiquity();
                //    await getCollateralFactor();
                // await borrowBalance();
                // await borrow();
                // await getSupplyBalance();
                // await getAssetsIn();
            })();
        }
    }, [currentAccount]);

    const redeemFunction = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI,
                signer
            );
            console.log({ currentAccount });
            let cTokenBalance = (await contract.balanceOf(address)) / 1e8;
            const tx = await contract.redeem(cTokenBalance * 1e8, {
                from: address,
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
            });
            console.log({ tx }, "TX_________________");

            console.log({ cTokenBalance });
        } catch (error) {}
    };
    const callFunc = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log({ address });
            const contract = new ethers.Contract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI,
                signer
            );

            setContract(contract);

            console.log(address, ethers.utils.hexlify(2000));
            console.log(ethers.utils.hexValue(ethers.utils.parseEther("0.5")));
            const tx = await contract.mint({
                from: address,
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
                value: ethers.utils.hexValue(ethers.utils.parseEther("0.05")),
            });
            console.log(tx, "______________________TX");
            setData(tx);
            return contract;
        } catch (err) {
            console.log(err);
        }
    };

    const getSupplyBalance = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            const contract = new ethers.Contract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI,
                signer
            );

            const tx = (await contract.balanceOf(address)) / 1e8;
            console.log(tx, "______________________TX");
            setData(tx);
            return contract;
        } catch (err) {
            console.log(err);
        }
    };

    const enterMarket = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
                CONSTANTS.COMPT_ABI,
                signer
            );

            const markets = [CONSTANTS.CONTRACT_ADDRESS];
            console.log(markets);
            const tx = await contract.enterMarkets(markets, {
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
            });
            console.log({ tx }, "TX_________________");
        } catch (error) {
            console.log(error);
        }
    };

    const getAccountLiquity = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
                CONSTANTS.COMPT_ABI,
                signer
            );

            console.log(address);
            let { 1: tx } = await contract.getAccountLiquidity(address);
            tx = tx / 1e18;
            console.log({ tx }, "TX_________________");
        } catch (error) {
            console.log(error);
        }
    };

    const getCollateralFactor = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
                CONSTANTS.COMPT_ABI,
                signer
            );

            console.log(address);
            let { 1: collateralFactor } = await contract.markets(
                CONSTANTS.CONTRACT_ADDRESS
            );
            collateralFactor = (collateralFactor / 1e18) * 100;
            console.log({ collateralFactor }, "TX_________________");
        } catch (error) {
            console.log(error);
        }
    };
    const borrow = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.CDAI_CA,
                CONSTANTS.CDAI,
                signer
            );
            const borrowAmount = 0.1 * Math.pow(10, 18);
            console.log(borrowAmount);
            let tx = await contract.borrow(`${borrowAmount}`, {
                from: address,
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
            });
            tx.wait();

            console.log({ tx }, "TX_________________");
        } catch (error) {
            console.log(error);
        }
    };

    const borrowBalance = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.CUSDT_CA,
                CONSTANTS.CUSDT_ABI,
                signer
            );

            console.log(address);
            let balance = await contract.borrowBalanceCurrent(address);
            // balance = balance / Math.pow(10, 18);
            balance.wait();
            console.log({ balance }, "TX_________________");
        } catch (error) {
            console.log(error);
        }
    };

    const getAssetsIn = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
                CONSTANTS.COMPT_ABI,
                signer
            );

            // console.log({ address });
            // let assets = await contract.getAssetsIn(address);
            console.log({ address });
            let assets = await contract.getAllMarkets();
            // balance = balance / Math.pow(10, 18);
            console.log({ assets }, "TX_________________");
        } catch (error) {
            console.log(error);
        }
    };
    const uploadFileToContract = async (payload) => {
        try {
            console.log(payload, "payl________-");
            console.log("C__________________________");
            const tx = await contract.addUserFile(
                payload.uid,
                payload.name,
                payload.url,
                payload.thumbnail
            );
            console.log(tx, "uploaded");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {currentAccount ? (
                <Homepage
                    currentAccount={currentAccount}
                    data={data}
                    contract={contract}
                />
            ) : (
                <LandingPage
                    connectWallet={connectWallet}
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                    data={data}
                    contract={contract}
                />
            )}
        </div>
    );
};

export default App;
