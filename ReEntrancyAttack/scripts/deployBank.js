const hre = require("hardhat");
const config = require("../config");

async function main() {
    // Get the contract factory for EtherBank
    const EtherBankContract = await hre.ethers.getContractFactory("contracts/EtherBank.sol:EtherBank");
    
    // Deploy the EtherBank contract
    const etherBankInstance = await EtherBankContract.deploy();

    // Wait for the contract to be deployed
    await etherBankInstance.deployed();

    // Log the deployed contract address
    console.log("EtherBank contract successfully deployed to:", etherBankInstance.address);

    // Update the configuration file with the deployed contract address
    config.set({ "bankContractAddress": etherBankInstance.address });
}


module.exports = main().catch((error) => {
    console.error("Error encountered during deployment:", error);
    process.exitCode = 1;
});


