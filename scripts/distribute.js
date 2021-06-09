const TokenDistributor = artifacts.require("TokenDistributor");
const TokenContract = artifacts.require("TokenContract");
const Web3 = require("web3");
const addresses = require("../data/addresses");
const { expect } = require("chai");
require('dotenv').config();

module.exports = async (cb) => {
    try {
        const receiverAddresses = addresses.values.map(e => {return e.address})
        const amounts = addresses.values.map(e => {return e.amount})

        const tokenDistributor = await TokenDistributor.at(process.env.TOKEN_DISTRIBUTOR);
        const tokenAddress = process.env.TOKEN_ADDRESS;
        const token = await TokenContract.at(tokenAddress);
        const accounts = await web3.eth.getAccounts();

        // transfer all tokens to the contract
        // this can be changed later
        await token.transfer(
            tokenDistributor.address,
            (await token.balanceOf(accounts[0])).toString()
        );

        await tokenDistributor.distributeTokens(receiverAddresses, amounts, tokenAddress);
        console.log("~~~~~distributed tokens successfully~~~~~");
        for (let i = 0; i < receiverAddresses.length; i++) {
            const balance = Number(await token.balanceOf(receiverAddresses[i]));
            // asser that this user now has some balance
            // greater than or equal to the amount they received
            const balIncrease = balance >= amounts[i];
            expect(balIncrease).to.be.true;
        }
        cb();
    } catch (error) {
        console.log("error: ", error);
    }    
};
