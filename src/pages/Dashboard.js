import { Fragment, useContext, useState } from "react";
import { FaWallet, FaLock, FaLockOpen } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";

import Nav from "../components/NavBar";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Prompt from "../components/Prompt";
import Alert from "../components/Alert";
import { CONSTANTS } from "../constants";

const Dashboard = ({ mint, done, cethBal, redeem, enterMarket }) => {
    const [tab, setTab] = useState(true);
    const [supplyPrompt, setSupplyPrompt] = useState(false);
    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState(false);
    const [amount, setAmount] = useState(0);

    const supply = (e) => {
        if (e.underlying_symbol !== "ETH") {
            console.log(e.underlying_symbol);
            window.alert("We only support ETH at the moment ");
            return;
        }
        setSupplyPrompt(true);
    };

    return (
        <>
            <Prompt
                heading="Supply Eth"
                subheading="Supply the amount of ethereum you would like to supply"
                placeholder="eth quantity"
                button="Supply Ethereum"
                onChangeAmount={(e) => setAmount(e.target.value)}
                show={supplyPrompt}
                onClose={() => setSupplyPrompt(false)}
                onSubmit={() => {
                    mint(amount);
                    setSupplyPrompt(false);
                }}
            />
            {loader && <Loader />}
            {alert && (
                <Alert
                    message="this is the alert"
                    onClose={() => setAlert(false)}
                />
            )}
            <Nav />
            <div className="p-4 bg-[#011936]">
                <div className="p-6">
                    <div className="flex ">
                        <div className="cursor-pointer flex items-center justify-center">
                            <div className="bg-slate-800 rounded-md p-2 m-2">
                                <IoWalletOutline className="h-6 w-6 text-gray-200" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="text-sm text-gray-200 font-bold">
                                    {" "}
                                    Net Worth
                                </p>
                                <div className="flex justify-start items-center">
                                    <span className="text-sm text-gray-200 font-bold">
                                        $
                                    </span>
                                    <span className="text-3xl text-white font-extrabold">
                                        0
                                    </span>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex items-center justify-center">
                            <div className="bg-slate-800 rounded-md p-2 m-2">
                                <BsBarChart className="h-6 w-6 text-gray-200" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="text-sm text-gray-200 font-bold">
                                    {" "}
                                    Net APY
                                </p>
                                <div className="flex justify-start items-center">
                                    <span className="text-3xl text-white font-extrabold">
                                        0
                                    </span>{" "}
                                    <span className="text-sm text-gray-200 font-bold">
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <ul className="flex bg-slate-800  p-1 rounded-lg w-min">
                        <li
                            onClick={() => setTab(true)}
                            className={`py-2 px-6 md:px-16 mx-1 ${
                                tab
                                    ? "bg-white text-black"
                                    : "bg-[#011936] text-white"
                            } rounded-lg cursor-pointer`}
                        >
                            Supply
                        </li>
                        <li
                            onClick={() => setTab(false)}
                            className={`py-2 px-6 md:px-16 mx-1 ${
                                !tab
                                    ? "bg-white text-black"
                                    : "bg-[#011936] text-white"
                            } rounded-lg cursor-pointer`}
                        >
                            Borrow
                        </li>
                    </ul>
                </div>
                <>
                    <div className="-mx-2">
                        {tab && (
                            <div className="w-full   lg:px-8">
                                <div className="rounded-lg shadow-sm mb-4">
                                    <div className="rounded-lg bg-slate-800 shadow-lg md:shadow-xl relative overflow-hidden">
                                        <div className="px-3 pt-8 pb-10 text-center relative z-1">
                                            <h3 className="text-3xl text-white font-semibold leading-tight my-3">
                                                Your Supplies
                                            </h3>
                                            {cethBal && (
                                                <div className="bg-slate-800 lg:p-8 rounded-md w-full">
                                                    <div>
                                                        <div className=" py-4 overflow-x-auto">
                                                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                                                <table className="min-w-full leading-normal">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                                                Assets
                                                                            </th>
                                                                            <th className="px-5 py-3 flex justify-center items-center border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                                                Wallet
                                                                                Balance
                                                                            </th>

                                                                            <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                                                Can
                                                                                be
                                                                                collateral
                                                                            </th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"></th>
                                                                            <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="bg-slate-800">
                                                                        <tr>
                                                                            <td className="px-5 py-5 border-b border-gray-600 bg-slate-800 text-sm">
                                                                                <div className="flex items-center">
                                                                                    <div className="flex-shrink-0 w-10 h-10">
                                                                                        <img
                                                                                            className="w-full h-full rounded-full"
                                                                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/5636.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                    <div className="ml-3">
                                                                                        <div className="text-white font-bold whitespace-nowrap">
                                                                                            CETH
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className=" py-5 border-b text-center border-gray-600 bg-slate-800 text-sm">
                                                                                <div className="text-white font-normal whitespace-nowrap">
                                                                                    {
                                                                                        cethBal
                                                                                    }
                                                                                </div>
                                                                            </td>

                                                                            <td className="py-5 border-b text-center border-gray-600 bg-slate-800 text-sm">
                                                                                <div className="text-white whitespace-nowrap">
                                                                                    Yes
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-5 py-5 border-b border-gray-600 bg-slate-800 text-sm">
                                                                                <Button
                                                                                    title="Use as collateral"
                                                                                    onClick={() =>
                                                                                        setLoader(
                                                                                            true
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </td>
                                                                            <td className="px-5 py-5 border-b border-gray-600 bg-slate-800 text-sm">
                                                                                <Button
                                                                                    title="Redeem"
                                                                                    onClick={() =>
                                                                                        redeem()
                                                                                    }
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute bottom-0 inset-x-0">
                                            <canvas
                                                id="chart1"
                                                height="70"
                                            ></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!tab && (
                            <div className="w-full  lg:px-8">
                                <div className="rounded-lg shadow-sm mb-4">
                                    <div className="rounded-lg bg-slate-800 shadow-lg md:shadow-xl relative overflow-hidden">
                                        <div className="px-3 pt-8 pb-10 text-center relative z-1">
                                            <h4 className="text-sm uppercase text-gray-200 leading-tight">
                                                Your borrows
                                            </h4>
                                            <h3 className="text-3xl text-white font-semibold leading-tight my-3">
                                                Nothing borrowed yet
                                            </h3>
                                        </div>
                                        <div className="absolute bottom-0 inset-x-0">
                                            <canvas
                                                id="chart2"
                                                height="70"
                                            ></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="bg-[#011936] lg:p-8 rounded-md w-full">
                            <div>
                                <h3 className="text-white font-extrabold text-3xl">
                                    Assets to Supply
                                </h3>

                                <div className=" py-4 overflow-x-auto">
                                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                            <thead>
                                                <tr>
                                                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                        Assets
                                                    </th>
                                                    <th className="px-5 py-3 flex justify-center items-center border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                        Wallet Balance
                                                    </th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                        APY
                                                    </th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                                                        Can be collateral
                                                    </th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"></th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-slate-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-slate-800">
                                                {CONSTANTS.ORACLEDATA.map(
                                                    (e) => (
                                                        <tr>
                                                            <td className="px-5 py-5 border-b border-gray-600 bg-slate-800 text-sm">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 w-10 h-10">
                                                                        <img
                                                                            className="w-full h-full rounded-full"
                                                                            src={`https://compound.finance/compound-components/assets/asset_${e.underlying_symbol}.svg`}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-white font-bold whitespace-nowrap">
                                                                            {
                                                                                e.underlying_symbol
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className=" py-5 border-b text-center border-gray-600 bg-slate-800 text-sm">
                                                                <div className="text-white font-normal whitespace-nowrap">
                                                                    0
                                                                </div>
                                                            </td>
                                                            <td className="py-5 border-b text-center border-gray-600 bg-slate-800 text-sm">
                                                                <p className="text-white whitespace-nowrap self-center ">
                                                                    0.46%
                                                                </p>
                                                            </td>
                                                            <td className="py-5 border-b text-center border-gray-600 bg-slate-800 text-sm">
                                                                <div className="text-white whitespace-nowrap">
                                                                    Yes
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-600 bg-slate-800 text-sm">
                                                                <Button
                                                                    title="Supply"
                                                                    onClick={() =>
                                                                        supply(
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-600 bg-slate-800 text-sm">
                                                                <Button title="Details" />
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};
export default Dashboard;
