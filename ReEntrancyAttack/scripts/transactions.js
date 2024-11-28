const hre = require("hardhat");
const config = require("../config");

// Load the contract address and name from the configuration file
const bankContractAddress = config.configData.bankContractAddress;
const bankContractIdentifier = "contracts/EtherBank.sol:EtherBank";

async function main() {
    const accounts = await hre.ethers.getSigners(); // Retrieve available accounts (signers)

    // Deposit 3 ETH from the first account
    console.log("Depositing 3 ETH from Account 0 (First Account)");
    let bankContractInstance = await hre.ethers.getContractAt(bankContractIdentifier, bankContractAddress, accounts[0]);
    await (await bankContractInstance.depositETH({ value: hre.ethers.utils.parseUnits("3", "ether") })).wait();

    // Deposit 5 ETH from the second account
    console.log("Depositing 5 ETH from Account 1 (Second Account)");
    bankContractInstance = await hre.ethers.getContractAt(bankContractIdentifier, bankContractAddress, accounts[1]);
    await (await bankContractInstance.depositETH({ value: hre.ethers.utils.parseUnits("5", "ether") })).wait();

    // Deposit 12 ETH from the third account
    console.log("Depositing 12 ETH from Account 2 (Third Account)");
    bankContractInstance = await hre.ethers.getContractAt(bankContractIdentifier, bankContractAddress, accounts[2]);
    await (await bankContractInstance.depositETH({ value: hre.ethers.utils.parseUnits("12", "ether") })).wait();

    // Display the bank contract's balance and individual account balances
    console.log(`Bank Contract Total Balance: ${hre.ethers.utils.formatUnits(await hre.ethers.provider.getBalance(bankContractAddress))}`);
    console.log(`Account 0 (First Account) Balance in Bank: ${hre.ethers.utils.formatUnits(await bankContractInstance.balances(accounts[0].address))}`);
    console.log(`Account 1 (Second Account) Balance in Bank: ${hre.ethers.utils.formatUnits(await bankContractInstance.balances(accounts[1].address))}`);
    console.log(`Account 2 (Third Account) Balance in Bank: ${hre.ethers.utils.formatUnits(await bankContractInstance.balances(accounts[2].address))}`);
    console.log(`Account 3 (Fourth Account) Balance in Bank: ${hre.ethers.utils.formatUnits(await bankContractInstance.balances(accounts[3].address))}`);
}


module.exports = main().catch((error) => {
    console.error("An error occurred:", error);
    process.exitCode = 1;
});





