import React, {useState, useEffect} from 'react'
import {useAccount, useConnect, useSignMessage} from 'wagmi'
import { useUserContext } from '@/providers/UserContext'
export default function LoginPage() {
  const {address, status}  =  useAccount()
    const {connect, connectors, connectAsync}  = useConnect()
    const {userProfile, verifyNonce, userInfo} = useUserContext()

    useEffect(() => {
     
        if(status === "connected" && !userProfile){
            verifyNonce()
        }
    }, [address, status])
    
    

      console.log("the  user  profile", userProfile)
      console.log("the  user  profile  info", userInfo)
  return (
    <div className='border  w-[400px] h-[500px] border-purple-300 rounded-xl flex flex-col items-center justify-center'>

  <div>
    {connectors?.map((connector)  =>  (
        <div key={connector.uid} onClick={() => connect({connector})} className='my-4 border'> 
    
        
         
        <button>{connector.name}</button>
        </div>
  
    ))}
  </div>

    </div>
  )
}
