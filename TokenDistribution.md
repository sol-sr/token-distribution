# Overview
This document will explain how to use the scripts to distribute tokens to many addresses at once.

## Setup
Before running the script, you will need to load up the addresses.json file in the data folder with the proper addresses and the corresponding token amounts each address should receive. The current addresses.json file has examples of how to load this data up. Double and triple check this JSON file before running the script so you send the tokens to the right address.

## Deployment
Deploy the smart contracts with the private key you would like to call this contract with as the deployer will become the owner. Set the private key and infuraid in the .env file before running the migrate command. How to migrate the contracts to mainnet:
```
truffle migrate --network mainnet
```

## Token Distribution
Make sure you have read the setup section before going any farther. Now you will need to set the TOKEN_DISTRIBUTOR environment variable in the .env file to the correct address of this deployed contract. Then, set the TOKEN_ADDRESS of the token contract that you would like to transfer tokens from. Once the .env file is 100% set up and the addresses.json file is set up as well with the proper receiving addresses and token amounts, you will need to run the script.
```
truffle exec scripts/distribute.js --network mainnet
```
