const hre = require("hardhat");
const config = require("../config");

// Load contract details from the configuration
const etherBankAddress = config.configData.bankContractAddress;
const etherBankIdentifier = "contracts/EtherBank.sol:EtherBank";

async function main() {
    // Get the list of available accounts (signers)
    const accounts = await hre.ethers.getSigners();

    // Get the deployed contract instance
    const etherBankInstance = await hre.ethers.getContractAt(etherBankIdentifier, etherBankAddress, accounts[0]);

    // Print bank's total balance and individual account balances
    console.log(`Bank Total Balance: ${hre.ethers.utils.formatUnits(await hre.ethers.provider.getBalance(etherBankAddress))} ETH`);
    console.log(`Account 0 Balance in Bank: ${hre.ethers.utils.formatUnits(await etherBankInstance.balances(accounts[0].address))} ETH`);
    console.log(`Account 1 Balance in Bank: ${hre.ethers.utils.formatUnits(await etherBankInstance.balances(accounts[1].address))} ETH`);
    console.log(`Account 2 Balance in Bank: ${hre.ethers.utils.formatUnits(await etherBankInstance.balances(accounts[2].address))} ETH`);
    console.log(`Account 3 Balance in Bank: ${hre.ethers.utils.formatUnits(await etherBankInstance.balances(accounts[3].address))} ETH`);
}


main().catch((error) => {
    console.error("An error occurred:", error);
    process.exitCode = 1;
});






