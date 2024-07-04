//@ts-nocheck

import React, {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'
import { Button } from '../ui/button'
import Image from 'next/image';
import Search from './Search';
import Authenticated from './Authenticated';
import Authenticate from './Authenticate';
import Link from 'next/link';
import SearchVids from './Search';
import { ethers, Contract } from 'ethers';
import { useGetUserProfiles } from '@/hooks/useGetUserProfiles';
import { GET_USER_PROFILES_BY_ADDRESS } from '@/graphql/fragments/getUserProfiles';
import { useQuery } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import { useUserContext } from '@/providers/UserContext';
import {useAccount}  from 'wagmi'
import Modal from '../common/Modal';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
type headerprops  = {
	isShowFull? : boolean
	 toggleSidebar? : any
}
export default function Header({isShowFull, toggleSidebar} : headerprops) {
  const {theme, setTheme} = useTheme()
  const  {address} = useAccount()

  const [userProfiles, setuserProfiles] = useState()
  const {userProfile,logout  } = useUserContext()
const [isShowHandleModal, setisShowHandleModal] = useState(false)
   const profileData = userProfiles?.profiles[0]

console.log("the user profile",userProfile )
   const  deisconnect =  ()  =>  {
		alert("I'm demo")
	 }

const {data:userData, isLoading: isUserDataLoading, isError : isUserDataError} = useGetUserInfo(userProfile?.id)

   console.log("the user data", userData)
  
 // const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");


    // handle fetch  profile

	 const handleFetchUserInfo = async () => {
		  if(userProfile){
			const {data, loading, error, errors} = await apolloClient.query({
				query : GET_USER_PROFILES_BY_ADDRESS,
				variables : {
					"where": {
						"creator": userAddress
					  }
				}
				})
				setuserProfiles(data)
		  }

		 
	 }


	 
 
  
  /*const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse));
  };*/

  const handleLogin = async (authType) => {
    alert("I'm demo")
  };


  

    
  return (
    <div className='flex justify-between h-[50px] md:h-[60px] items-center px-2 md:px-4 py-7 sticky top-0 dark:bg-black bg-white/90 z-10 mx-auto  border-b border-gray-300 dark:border-gray-900   '>
		 <div className=' gap-2 items-center flex '>
			<div className='dark:bg-gray-800/90  cursor-pointer hidden md:hidden hover:bg-gray-400/40 bg-gray-300/60 w-9 h-9 rounded-full  items-center justify-center' onClick={toggleSidebar}>
              {!isShowFull ? (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
				<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			  </svg>
			  
			  ) : (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

			  )
			  
			  }
			</div>
			<div className='flex items-center gap-2'>
		 <Link href={`/`}>
		<Image  src={`/img/logo.jpg`}  width={150} height={150} alt='logo' 
  className='w-7 h-7 rounded-full cursor-pointer'
/>	</Link></div>
<p className='text-xs font-semibold text-rose-500'>TESTNET</p>
		 </div>
	


  <SearchVids  />
{/*<ConnectButton>
		{(status, { connect, selectCharacters }) => {
			if (status.isConnected) {
				const { character } = status.account;
				const displayName =
					extractCharacterName(character) ?? status.displayAddress;
          const userAddress = status?.displayAddress
 
				return (
				<Authenticated  handle={displayName} address={userAddress} profile={character} />
				);
			} else {
				return  <Authenticate   />
			}
		}}
	</ConnectButton>
	*/}
	  

   {
	userProfile  ? (
		<Authenticated     handle={userData?.username} address={userData?.address}   profile={userData} disconnect={logout} xp={userData?.xp}  />
	) : (
		<Authenticate  authenticate={handleLogin}  />
	)
   }

    
    </div>
  )
}
