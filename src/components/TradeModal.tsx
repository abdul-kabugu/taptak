import React, {useState} from 'react'
import { GiAlliedStar } from "react-icons/gi";
import FireOutline from './common/Icons/FireOutline';
import { FaFire } from 'react-icons/fa';
export default function TradeModal() {
    const [side, setside] = useState("buy")
    const [amountToBuy, setamountToBuy] = useState()
    const [amountToSell, setamountToSell] = useState()


      const  getSide  =  ()  =>  {
         if(side === "buy"){
             return(
                <>
                <div  className='w-full h-24 border border-gray-400 dark:border-gray-700 hover:border-green-400 p-2 rounded-xl'>
               <p className='font-semibold  mb-3'>Amount to buy</p>
                
                <div className='flex items-center justify-between'>
                     <input   type='number' value={amountToBuy} placeholder='amount'  className='w-[70%] py-2 px-3 bg-inherit focus:outline-none focus:border-b-2 border-green-500' />
                      <p>balance : 0.00</p>
                </div>
                </div>


<div  className='w-full h-24 border border-gray-400 dark:border-gray-700 hover:border-green-400 p-2 rounded-xl mt-3'>
<p className='font-semibold  mb-3'>Requuired Base assets</p>
 
 <div className='flex items-center justify-between'>
     <p className='font-mono'>5</p>
       <p className='font-mono'>balance : 0.00</p>
 </div>
 </div >

  <div  className='w-full  py-3 px-2 flex space-x-2 items-center justify-center mt-5 border border-green-400 rounded-xl'>
      <FaFire className='animate-bounce w-5 h-5 text-green-600'  />
      <p>bUY nOW</p>
  </div>
 </>
             )
         }else if(side === "sell") {
            return(
                <div>
                      <>
                <div  className='w-full h-24 border border-gray-400 dark:border-gray-700 hover:border-green-400 p-2 rounded-xl'>
               <p className='font-semibold  mb-3'>Amount to sell</p>
                
                <div className='flex items-center justify-between'>
                     <input   type='number' value={amountToBuy} placeholder='amount'  className='w-[70%] py-2 px-3 bg-inherit focus:outline-none focus:border-b-2 border-green-500' />
                      <p>balance : 0.00</p>
                </div>
                </div>


<div  className='w-full h-24 border border-gray-400 dark:border-gray-700 hover:border-green-400 p-2 rounded-xl mt-3'>
<p className='font-semibold  mb-3'> Base amount You recieve </p>
 
 <div className='flex items-center justify-between'>
     <p className='font-mono'>50</p>
       <p className='font-mono'>balance : 0.00</p>
 </div>
 </div >

  <div  className='w-full  py-3 px-2 flex space-x-2 items-center justify-center mt-5 border border-red-600 rounded-xl'>
      <FaFire className='animate-bounce w-5 h-5 text-green-600'  />
      <p>sEll nOW</p>
  </div>
 </>
                </div>
            )
         }
      }
  return (
    <div className='w-full   border-4 border-green-600 p-3 py-6 mt-11 rounded-xl '>

   <div className='  flex space-x-10'>
    <div className={` ${side === "buy" && "border-b-4 border-green-400"} flex space-x-1.5 items-center w-28 px-3 pb-3 cursor-pointer`} onClick={() => setside("buy")}>
    <GiAlliedStar />
    <p>Buy</p>
    </div>

    <div className={` ${side === "sell" && "border-b-4 border-green-400"} flex space-x-1.5 items-center w-28 px-3 pb-3 cursor-pointer`} onClick={() => setside("sell")}>
   <FaFire    />
    <p>Sell</p>
    </div>
   </div>

    <div  className='my-4'>
        <div>{getSide()}</div>
    </div>
    </div>
  )
}
