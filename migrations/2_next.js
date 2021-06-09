const TokenDistributor = artifacts.require("TokenDistributor");
const MintableToken = artifacts.require("MintableToken");

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {

    await deployer.deploy(TokenDistributor);
    await deployer.deploy(MintableToken);
    if (network !== "mainnet") {
        const token = await MintableToken.deployed();
        for (let i = 0; i < 10; i++) {
            await token.mint(accounts[i], 1000000000);
        }
    }
  });
};
