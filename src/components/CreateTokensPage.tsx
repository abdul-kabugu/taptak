import React, {useState, useEffect} from 'react'
import {useSendTransaction, useAccount, useWriteContract, useReadContract,  useWaitForTransactionReceipt, useWatchContractEvent, useTransactionReceipt}  from 'wagmi'


import tokenAbi  from  "../abi/tokenAbi.json"
import  tokenABI  from "../abi/aboabi.json"
import  bonding from '../abi/bonding.json'
import factoryAbi from '../abi/factory.json'
import { SC_ADDRESS_TWO, SC_CONTRACT_ADDRESS, TOKEN_1_CONTRACT, TOKEN_2_CONTRACT, TOKEN_ADDRESS } from '@/assets/constant'
import { ethers } from "ethers";
import { useEthersSigner } from '@/etherSigner'
export default function CreateTokensPage() {
    const [name, setname] = useState("")
    const [symbol, setsymbol] = useState("")
const [contractInstance, setcontractInstance] = useState()
     const  signer = useEthersSigner()
    //const [initialPrice, setinitialPrice] = useState()
    const [alg, setalg] = useState("")
    const {address}  = useAccount()
    const {}  = useSendTransaction()
    const [tokenGensContract, setTokenGensContract] = useState()
    const [socialTokenContract, setSocialTokenContract] = useState()
    const [tokenContract, setTokenContract] = useState(null);
    const [contract, setContract] = useState(null);
   /* const connectWallet = async () => {
      if (window.ethereum) {
        // If the browser has the Ethereum object (MetaMask is available):
      let   web3 = new ethers.BrowserProvider(window.ethereum); // Initialize the Web3 provider using MetaMask.
        // Check if the connected network is Polygon Mumbai (chain ID: 80001)
        const networkId = (await web3.getNetwork()).chainId;

         const  tokenGenerInstance = new ethers.Contract(SC_CONTRACT_ADDRESS, factoryAbi, signer )

         const  socialTokenInstance = new ethers.Contract(TOKEN_2_CONTRACT, tokenAbi, signer )
    setsocialTokenContract(socialTokenInstance)
        settokenGensContract(tokenGenerInstance)


          tokenGenerInstance?.on("TokenCreated", (tokenAddress, name, symbol, creator) => {
            console.log("Token created:", { tokenAddress, name, symbol, creator });
            // You can store or use this information as needed
        });
      } else {
        // If MetaMask is not detected, show an alert to the user.
        alert("MetaMask not detected! Please install MetaMask.");
      }
    }

    useEffect(() => {
  
    
          connectWallet()
      
    }, [])*/



    useEffect(() => {
      if (signer) {
        const tokenGenerInstance = new ethers.Contract(SC_CONTRACT_ADDRESS, factoryAbi, signer);
        const socialTokenInstance = new ethers.Contract(TOKEN_2_CONTRACT, tokenAbi, signer);
  
        setSocialTokenContract(socialTokenInstance);
        setTokenGensContract(tokenGenerInstance);
  
        tokenGenerInstance.on("TokenCreated", (tokenAddress, name, symbol, creator) => {
          console.log("Token created:", { tokenAddress, name, symbol, creator });
        });
      }
    }, [signer]);



    // Example usage
const stepRanges = [1, 5, 10, 100, 200];
const stepPrices = [ethers.parseEther("0"), ethers.parseEther("0.0001"), ethers.parseEther("0.001"), ethers.parseEther("0.005"), ethers.parseEther("100")];


    const handleDeploy =  async () =>  {
      const initialPriceInEth  = ethers.parseEther("0.000001235")
      const k = 1
      console.log("you hooked me")
      if(tokenGensContract){
         const  starting  =  ethers.parseEther("0.0002873")
         const k = 1 
         try {
           const  tx = await tokenGensContract.createToken("MIRAJI", "mrj", stepRanges, stepPrices)
   
           tx.wait();
   
   
             console.log("the tx", tx)
           alert('Payment successful!');
           
         } catch (error) {
           console.error(error);
           alert('Payment failed');
         }
   
      
      }
   }
    

     const  chunked  =  ethers.parseUnits("1", 18)
     console.log("chunked", ethers.parseUnits("1", 18))

   const checkPrice  = async (amount)  =>  {
    try {
    
   // const amountInSmallestUnit = ethers.parseUnits(amount.toString(), 18);
    const price = await socialTokenContract?.calculatePrice(3);
    const EthPrice  =  ethers.formatEther(price)

        console.log("the  token price  is", price)
        console.log("the  token price in ETH is", EthPrice)
    } catch (error) {
        alert("something  went  wrong")
        console.log(error)
    }
  }


  const buyTokens  =  async (amount) => {
    

    try {
      const amountInSmallestUnit = ethers.parseUnits(amount.toString(), 18);
      const price = await  socialTokenContract.calculatePrice(amount);

      const tx = await socialTokenContract.buy(amountInSmallestUnit, { value: price });

      await tx.wait();
      console.log('Tokens bought:', tx);
      
    } catch (error) {
        alert("something  went  wrong")
        console.log(error)
    }

    
  
}



const sellTokens  =  async (amount) => {
    
  const amountInSmallestUnits = ethers.parseUnits(amount.toString(), 18);
  try {

      
    const tx = await socialTokenContract.sell(1);

    await tx.wait();
    console.log('Tokens sold:', tx);
    
  } catch (error) {
      alert("something  went  wrong")
      console.log(error)
  }

  
  
}


 
 

 // Wait for the transaction to be mined and get the receipt

const handleBuyTokens = async () =>  {
   
}
    

  return (
    <div className='flex flex-col scroll-py-4'>
        <h1>create  your  personal account</h1>

          <input   value={name} onChange={(e) => setname(e.target.value)} placeholder='name' />
          <input   value={symbol} onChange={(e) => setsymbol(e.target.value)} placeholder='symbol' />
          <input   value={alg} onChange={(e) => setalg(e.target.value)} placeholder='algo' />

           <button className='bg-yellow-400 p-4 my-8 rounded-xl text-white' onClick={() => handleDeploy()}>write token</button>
           <button className='bg-yellow-400 p-4 my-8 rounded-xl text-white' onClick={() => checkPrice(1)}>get price</button>
           <button className='bg-yellow-400 p-4 my-8 rounded-xl text-white' onClick={() => buyTokens(10)}>buy </button>
           <button className='bg-yellow-400 p-4 my-8 rounded-xl text-white' onClick={() => sellTokens(4)}>sell </button>
    <p>{address}</p>
          



    </div>
  )
}
