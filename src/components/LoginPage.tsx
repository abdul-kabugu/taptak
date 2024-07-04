//@ts-nocheck

import React, {useState, useEffect} from 'react'
import {useAccount, useConnect, useSignMessage} from 'wagmi'
import { useUserContext } from '@/providers/UserContext'
import { useRouter } from 'next/router'
export default function LoginPage() {
  const {address, status}  =  useAccount()
    const {connect, connectors, connectAsync}  = useConnect()
    const {userProfile, verifyNonce, userInfo} = useUserContext()
    const router = useRouter()
      const  CONECTOR = connectors[0]
    useEffect(() => {
     
        if(status === "connected" && !userProfile){
            verifyNonce()
        }

        if (status === "connected" && userProfile) {
          router.push('/')
        }
    }, [address, status, userProfile])
    
    

      console.log("the  user  profile", userProfile)
      console.log("the  user  profile  info", userInfo)
  return (
    <div className='border  w-[400px] h-[500px] border-purple-300 py-2 rounded-xl flex flex-col items-center justify-center'>

  <div>

      <h2 className='text-3xl font-extrabold my-4'>Sign in with wallet</h2>

      <p className='text-xs text-red-600'>Recommended  :  use injected wallet</p>
    {connectors?.map((connector)  =>  (
        <div key={connector.uid} onClick={() => connect({connector})} className='my-4 border w-full py-3 px-4 bg-green-600 hover:bg-green-300 text-white cursor-pointer rounded-xl'> 
    
        
         
        <button>{`Sign in with ${connector.name} `}</button>
        </div>
  
    ))}
  </div>

    </div>
  )
}
