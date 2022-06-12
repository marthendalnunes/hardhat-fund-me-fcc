import { getNamedAccounts, ethers, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { developmentChains } from "../../helper-hardhat-config";
import { FundMe, MockV3Aggregator } from "../../typechain";
import { assert } from "chai";

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe: FundMe;
      let deployer: SignerWithAddress;

      const sendValue = ethers.utils.parseEther("0.001");
      beforeEach(async function () {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        fundMe = await ethers.getContract("FundMe", deployer.address);
      });

      it("Allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });
