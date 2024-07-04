//@ts-nocheck
import React, {useState, useEffect, useRef} from 'react'
import { ethers, Contract } from 'ethers';
import ABI from '../../abi/rapu.json'
import tokenAbi  from  "../../abi/tokenAbi.json"
import { usePinToIpfs } from '@/hooks/usePinToIpfs';
import { json } from 'stream/consumers';
import { LuImagePlus } from "react-icons/lu";
import { Button } from '../ui/button';
import { useUserContext } from '@/providers/UserContext';
import { interests2 } from '@/assets/constant';
import { toast, useToast } from "../ui/use-toast";
import { useAccount, useConnect } from 'wagmi';
import { SC_ADDRESS_TWO, SC_CONTRACT_ADDRESS, TOKEN_1_CONTRACT, TOKEN_2_CONTRACT, TOKEN_ADDRESS } from '@/assets/constant'
import factoryAbi from '../../abi/factory.json'
import axios from 'axios';
import { useEthersSigner } from '@/etherSigner';
import {fraxtalTestnet}  from 'wagmi/chains'
type  Props = {
   closeModal : any
   address : any
}

export default function CreateTokenModal({closeModal, address} : Props) {
const [tokenName, settokenName] = useState("")
const [tokenSymbol, settokenSymbol] = useState()
const [earnings, setearnings] = useState()
   const [isCreating, setisCreating] = useState(false)
   const [tokenGensContract, setTokenGensContract] = useState()
   const {uploadToIpfs, isUploading, isUploadingError} = usePinToIpfs()
   const { userProfile} = useUserContext()


  const [socialTokenContract, setSocialTokenContract] = useState(null)
  const {connect, connectors, connectAsync}  = useConnect()
  const  signer = useEthersSigner()

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
 //const  contract = new Contract(address, ABI, signer)



   console.log("the  signer from modal", address)

  const  USER_ID = userProfile?.id    
 const createHandle = async () => {
  

   let postEndPoint = `https://sapo-rdii.onrender.com/api/auth/profile/${USER_ID}/edit`
try {
  setisCreating(true)
  if(channelAvatar){
    const avatarCID =  await  uploadToIpfs(channelAvatar)

    const result =  await  axios.put(postEndPoint, {
      username : ChannelHandle,
       bio : channelBio,
       avatar : avatarCID?.cid,
       cover : avatarCID?.cid,
       interests : selectedInterests,
    })

    console.log("profile updated success", result)
setisCreating(false)

    toast({
      title : "channel  updated",
      description : "channel updated succefully "
    })

  }

  
} catch (error) {
   console.log("error", error) 
   setisCreating(false)
}
  }


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
         const  tx = await tokenGensContract.createToken(tokenName, tokenSymbol, stepRanges, stepPrices)
 
         tx.wait();
 
 
           console.log("the tx", tx)
         alert('Payment successful!');
         
       } catch (error) {
         console.error(error);
         alert('Payment failed');
       }
 
    
    }
 }

    
  return (
    <div className=" p-3 w-full flex-col gap-2 max-w-7xl mx-auto flex items-center justify-center  bg-gray-300 dark:bg-gray-900  rounded-xl">

 
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

  



       
        
          <Button className='bg-green-500 text-text-on-primary w-full rounded-lg' disabled={!tokenName  || isCreating} onClick={() => handleDeploy()} variant={`ghost`} > Create Token</Button>

        
         <Button className='  w-full rounded-lg mt-3 text-text'  onClick={closeModal} variant={`outline`}>Skip</Button>

      </div>
    
      </div>
  )
}
