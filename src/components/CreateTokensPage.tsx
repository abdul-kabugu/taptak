//@ts-nocheck

import React, {useState, useEffect} from 'react'
import {useSendTransaction, useAccount, useWriteContract, useReadContract,  useWaitForTransactionReceipt, useWatchContractEvent, useTransactionReceipt}  from 'wagmi'

import Button from './common/Button'
import tokenAbi  from  "../abi/tokenAbi.json"
import  tokenABI  from "../abi/aboabi.json"
import { useConnect } from 'wagmi'
import  bonding from '../abi/bonding.json'
import { toast } from './ui/use-toast'
import factoryAbi from '../abi/factory.json'
import { SC_ADDRESS_TWO, SC_CONTRACT_ADDRESS, TOKEN_1_CONTRACT, TOKEN_2_CONTRACT, TOKEN_ADDRESS } from '@/assets/constant'
import { ethers } from "ethers";
import {fraxtalTestnet} from 'wagmi/chains'
import { useEthersSigner } from '@/etherSigner'
export default function CreateTokensPage() {
  const [tokenName, settokenName] = useState("")
  const [tokenSymbol, settokenSymbol] = useState()
  const [earnings, setearnings] = useState()
     const [isCreating, setisCreating] = useState(false)
     const  signer = useEthersSigner()
  
    const {address}  = useAccount()
    const {connect, connectors, connectAsync}  = useConnect()
    const {}  = useSendTransaction()
    const [tokenGensContract, setTokenGensContract] = useState()
    const [socialTokenContract, setSocialTokenContract] = useState()

    const  conector  = connectors[0]



    useEffect(() => {
      if (signer) {
        const tokenGenerInstance = new ethers.Contract(SC_CONTRACT_ADDRESS, factoryAbi, signer);
        const socialTokenInstance = new ethers.Contract(TOKEN_2_CONTRACT, tokenAbi, signer);
  
        setSocialTokenContract(socialTokenInstance);
        setTokenGensContract(tokenGenerInstance);
  
        tokenGenerInstance.on("TokenCreated", (tokenAddress, name, symbol, creator) => {
          console.log("Token created:", { tokenAddress, name, symbol, creator });
          
        toast({
          title : `${name} : created`,
          description : `Token created succefully :  CA : ${tokenAddress}`
        })
        });
      }
    }, [signer]);


    console.log("token gen contract", tokenGensContract  )

    // Example usage
const stepRanges = [1, 5, 10, 100, 200];
const stepPrices = [ethers.parseEther("0"), ethers.parseEther("0.0001"), ethers.parseEther("0.001"), ethers.parseEther("0.005"), ethers.parseEther("100")];


    const handleDeploy =  async () =>  {
      const initialPriceInEth  = ethers.parseEther("0.000001235")

       setisCreating(true)
      const k = 1
      console.log("you hooked me")
      if(tokenGensContract){
         const  starting  =  ethers.parseEther("0.0002873")
         const k = 1 
         try {
           const  tx = await tokenGensContract.createToken("MIRAJI", "mrj", stepRanges, stepPrices)
   
           tx.wait();
   
   
             console.log("the tx", tx)
         setisCreating(false)
           
         } catch (error) {
           console.error(error);
           alert('Payment failed');
           setisCreating(false)
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
    <div className='w-full min-h-screen flex items-center justify-center'>
    <div className=" p-3 w-full flex-col gap-2 max-w-7xl mx-auto flex items-center justify-center    rounded-xl">

 
    <div className='w-[430px]  border border-gray-300  dark:border-gray-700 rounded-lg p-4 flex flex-col items-center   '>


      <div className='my-3'>
      <h1 className=' my-3 text-sm '>Token name</h1>  
       <input
      type='text'
      placeholder='ex kabugu'
       onChange={(e) => settokenName(e.target.value)}
       value={tokenName}
       className='w-[370px] h-11 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

/>

  {
   
  }
      </div>

      <div className='my-3'>
      <h1 className=' my-3 text-sm '>Token symbol</h1>  
       <input
      type='text'
      placeholder='KBG'
       onChange={(e) => settokenSymbol(e.target.value)}
       value={tokenSymbol}
       className='w-[370px] h-11 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

/>

  
      </div>

      <div className='my-3'>
      <h1 className=' my-3 text-sm '>Creator Earning</h1>  
      <p className='text-xs  my-2 w-full'>Set a specific percentage to earn as fees from each minting (buying) and burning (selling) transactions of the token you create</p>
       <input
      type='number'
      placeholder='2%'
       onChange={(e) => setearnings(e.target.value)}
       value={earnings}
       className='w-[370px] h-11 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

/>

  
      </div>





     
        {
          !  address  ? (
            <Button className='bg-green-500 text-text-on-primary w-full rounded-lg' disabled={signer  || isCreating} onClick={() => conector?.connect({chainId : fraxtalTestnet.id})} variant={`ghost`} > Connect wallet</Button>

          ): (
            <Button className='bg-green-500 text-text-on-primary w-full rounded-lg' disabled={!tokenName  || isCreating} onClick={() => handleDeploy()} variant={`ghost`} > {isCreating ? "Creating token" : "Create token"}</Button>

          )
        }
        </div>
    

    </div>
    </div>
  )
}
