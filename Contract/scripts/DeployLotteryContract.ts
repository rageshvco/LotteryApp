import { ethers } from "ethers";
import { Lottery__factory, LotteryToken__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

async function main()
{
    const BET_PRICE = 1;
    const BET_FEE = 0.2;
    const TOKEN_RATIO = 1;

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey || privateKey.length <= 0) throw new Error("Missing environment private key");
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
    const balance = await signer.getBalance();
    console.log(`The account ${signer.address} has a balance of ${balance} wei`);
    
    const args = process.argv;     

    console.log("Deploying Lottery contract");
    const lottery__factory = new Lottery__factory(signer);
    const betPriceFixed = ethers.utils.parseEther(BET_PRICE.toFixed(18));
    const  betFeeFixed = ethers.utils.parseEther(BET_FEE.toFixed(18));
    console.log(`deploying lottery contract with ${betPriceFixed} ${betFeeFixed}`);
    const contract = await lottery__factory.deploy(
        "LotteryToken",
        "LT0",
        TOKEN_RATIO,
        ethers.utils.parseEther(BET_PRICE.toFixed(18)),
        ethers.utils.parseEther(BET_FEE.toFixed(18))
      );
    const deploy = await contract.deployed();
    const tokenAddress = await contract.paymentToken();
    const tokenFactory = await new LotteryToken__factory(signer);
    const token = tokenFactory.attach(tokenAddress);
    const lotteryTokenDeploy = await token.deployed();   
    console.log(`deploying lottery contract...${deploy}`);

    console.log(`awaiting for lotteryTokenDeploy ${lotteryTokenDeploy}`);
    console.log(`Lottery token address ${tokenAddress}`);
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
})