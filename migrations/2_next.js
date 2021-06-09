const TokenDistributor = artifacts.require("TokenDistributor");
const MintableToken = artifacts.require("MintableToken");

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(TokenDistributor);
    // don't deploy the token if you are on mainnet
    if (network !== "mainnet") {
        await deployer.deploy(MintableToken);
        const token = await MintableToken.deployed();
        for (let i = 0; i < 10; i++) {
            await token.mint(accounts[i], 1000000000);
        }
    }
  });
};
