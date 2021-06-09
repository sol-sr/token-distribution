const TokenDistributor = artifacts.require("TokenDistributor");
const MintableToken = artifacts.require("MintableToken");
const { expect } = require("chai");

const { expectRevert } = require("@openzeppelin/test-helpers");

contract('Token Distributor', function (accounts) {
  let distributor;
  let token;

  beforeEach(async function () {
    token = await MintableToken.new();
    distributor = await TokenDistributor.new( { from: accounts[0] });
    await token.mint(accounts[0], 10000)
  });

  async function validateBalances(accountAddresses, tokenAmounts) {
      for (let i = 0; i < accountAddresses.length; i++) {
          const address = accountAddresses[i];
          const amount = tokenAmounts[i];

          const balance = Number(await token.balanceOf(address));
          // assert balance is correct
          expect(balance).to.be.equal(amount);
      }
  }

  it("should be able to distribute tokens to multiple addresses as the owner", async() => {
    // deep copy array so splice doesn't mess up accounts array
    const newAcc = [...accounts];
    newAcc.splice(0, 1)

    const expectedBalances = newAcc.map(e => { return 0 });
    // expect everyone to have 0 balance
    await validateBalances(newAcc, expectedBalances)
    
    const newBalances = newAcc.map(e => { return 100 });
    await token.transfer(distributor.address, 900, {from: accounts[0]});

    await distributor.distributeTokens(newAcc, newBalances, token.address, {from: accounts[0]});
    await validateBalances(newAcc, newBalances)
  });

  it("should not be able to distribute tokens if caller is not owner", async() => {
    // deep copy array so splice doesn't mess up accounts array
    const newAcc = [...accounts];
    newAcc.splice(0, 1)

    const newBalances = newAcc.map(e => { return 100 });

    await expectRevert(
        distributor.distributeTokens(newAcc, newBalances, token.address, {from: accounts[1]}),
        "Ownable: caller is not the owner"
    );
  });

  it("should not be able to use delegatecall functionality if caller is not owner", async() => {
    await expectRevert(
        distributor.delegateCallLogic(token.address, "0x00", {from: accounts[1]}),
        "Ownable: caller is not the owner"
    );
  });
});