import { DeployFunction } from "hardhat-deploy/types"

const deployFundMe: DeployFunction = async function deployFunc() {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts;
    const chainId = network.config.chainId;
    console.log("Test")
}

export default deployFundMe
