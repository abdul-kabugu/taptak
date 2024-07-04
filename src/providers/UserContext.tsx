
//@ts-nocheck
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import { GET_USER_PROFILES_BY_ADDRESS } from '@/graphql/fragments/getUserProfiles';
import { apolloClient } from '@/graphql/apolloClient';
import {useLocalStorage}  from 'react-use'
import {useAccount, useSignMessage}  from 'wagmi'
import { jwtDecode } from "jwt-decode";
 type providerProps = {
  isGeneratingToken ? : any
  isWaitingForSignature ? :any
  logout : any
     verifyNonce : any
     userProfile : any
     toggleHandleModal: any
     isShowHandleModal : any
 } 
// Create a context
const UserContext = createContext<providerProps | undefined>(undefined);

export const useUserContext = (): providerProps => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error ("must be used in providers")
    }
    return context
}

  type ContextProps = {
    children : React.ReactNode
  }
export const UserContextProvider =({children} : ContextProps) => {

    const {signMessageAsync}  = useSignMessage()
    const {address}  = useAccount()
   const [userProfile, setuserProfile] = useState(null)
   const [isShowHandleModal, setisShowHandleModal] = useState(false)
   const [isGeneratingToken, setisGeneratingToken] = useState(false)
   const [isWaitingForSignature, setisWaitingForSignature] = useState(false)
   const [userInfo, setuserInfo] = useState(null)
   

      const toggleHandleModal = () => {
        setisShowHandleModal(!isShowHandleModal)
      }


   


      useEffect(() => {
        const token = localStorage.getItem('kbg_accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            setuserProfile(decoded);
        }
    }, []);


   const  generateNonce =  async () =>  {
    try {
      setisGeneratingToken(true)
      const response = await fetch("https://sapo-rdii.onrender.com/api/auth/generate-nonce")
      const data = response.json()
      setisGeneratingToken(false)
      return data
    } catch (error) {
      console.log("the error", error)
      setisGeneratingToken(false)
    }
  }

  const verifyNonce = async ()  =>  {

 
    try {
     
     const nonce =  await generateNonce()
      const message = `sign this  message to  sign in  ${nonce.nonce}`
      console.log("thenonce is ", nonce)
  setisWaitingForSignature(true)
        const  signedMessage  =  await signMessageAsync({message})

        const data =  {signedMessage, message , address}

        const response = await fetch("https://sapo-rdii.onrender.com/api/auth/verify-nonce", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const token = await response.json();
        setisWaitingForSignature(false)
        console.log("The jwt tokens:", token);
        localStorage.setItem('kbg_accessToken', token?.token);
        const decoded = jwtDecode(token?.token);
        setuserProfile(decoded);
    } catch (error) {
      console.log(error)
      setisWaitingForSignature(false)
    }
}

const logout = () => {
  localStorage.removeItem('kbg_accessToken');
  setuserProfile(null);
};


   const value = {
    isGeneratingToken,
    isWaitingForSignature,
    logout,
      userProfile,
       verifyNonce,
      toggleHandleModal,
      isShowHandleModal
   }

   return(
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
   )

}