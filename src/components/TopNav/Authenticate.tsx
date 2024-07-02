import React, {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'
import {useSignMessage, useConnect, useAccount}  from 'wagmi'
import {useUserContext} from "../../providers/UserContext"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { usePinToLivepeer} from '@/hooks/usePinToLivepeer'
import Button from '../common/Button'
import { User2Icon } from 'lucide-react'
import Link from 'next/link'

 type Props = {
   authenticate : any
 }
export default function Authenticate({authenticate} : Props) {
	const {getEndPointUrl, uploadertoTus} = usePinToLivepeer()
    const {theme} = useTheme()
	const {verifyNonce} = useUserContext()
   const {address, status}  = useAccount()
	const {connectors, connect} =  useConnect()
	const [file, setfile] = useState()

	console.log("the file", file)


	 const  handleAuth =  ()  =>  {
		verifyNonce()
	 }

	 useEffect(() => {
		if (address && status === "connected" ) {
		  verifyNonce();
		}
	  }, [address]);
	
  return (


	 
<Link href={"/login"}>
	<Button   className='bg-green-400 text-white font-semibold flex items-center justify-centers space-x-3'>
		<User2Icon  className='w-4 h-4' />
		<p>Sign in</p>
		
		</Button>

		</Link>

  
  )
}
