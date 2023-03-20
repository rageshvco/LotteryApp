import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";
dotenv.config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const config: HardhatUserConfig = {
  paths: { tests: "tests" },
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      account: GOERLI_PRIVATE_KEY, 
    },
    etherscan: {      
      apiKey: ETHERSCAN_API_KEY
    }
  }
};

export default config;
