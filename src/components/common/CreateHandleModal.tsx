//@ts-nocheck
import React, {useState, useEffect, useRef} from 'react'
import { ethers, Contract } from 'ethers';
import ABI from '../../abi/rapu.json'
import { usePinToIpfs } from '@/hooks/usePinToIpfs';
import { json } from 'stream/consumers';
import { LuImagePlus } from "react-icons/lu";
import { Button } from '../ui/button';
import { useUserContext } from '@/providers/UserContext';
import { interests2 } from '@/assets/constant';
import { toast, useToast } from "../ui/use-toast";
import axios from 'axios';
type  Props = {
   closeModal : any
}

export default function CreateHandleModal({closeModal} : Props) {
   const [ChannelHandle, setChannelHandle] = useState("")
   const [channelName, setchannelName] = useState()
   const [channelBio, setchannelBio] = useState()
   const [channelAvatar, setchannelAvatar] = useState()
   const [isHandleCreated, setisHandleCreated] = useState(false)
   const [isHandleFailed, setisHandleFailed] = useState(false)
   const [handleInfo, sethandleInfo] = useState()
   const [isCreating, setisCreating] = useState(false)
   const [handleCheck, sethandleCheck] = useState("NOT_AVAILABLE")
   const {uploadToIpfs, isUploading, isUploadingError} = usePinToIpfs()
   const {smartAccount, userAddress, userProfile} = useUserContext()
  const [balance, setBalance] = useState(null);
  const [selected, setselected] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState([]);

  const address = "0xdE3309F5513B2f88daf325ED8841404d74049Ea3";


 //const  contract = new Contract(address, ABI, signer)

  const selctAvatarRef = useRef(null)
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
       //interests : selectedInterests,
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

  const handleSelect = (item : any, interest) => {
   setselected(item)

   setSelectedInterests(prevState => {
    if (prevState.includes(interest)) {
      // Remove interest if it's already selected
      return prevState.filter(item => item !== interest);
    } else {
      // Add interest if it's not selected
      return [...prevState, interest];
    }
  });
  }

    
  return (
    <div className=" p-3 w-full flex-col gap-2 max-w-7xl mx-auto flex items-center justify-center  bg-gray-300 dark:bg-gray-900  rounded-xl">
      <p className='text-xs text-red-500 hidden'>If you want to comment  post  or like  claim your profile fisr</p>
  
      <h1 className='text-xl font-extrabold mb-4'>Update your channel profile</h1>
    <div className='my-4 hidden'>
       <h1 className='font-semibold  text-text-primary mb-1'>Quick guide</h1>
         <p className='text-xs'>1-  Fill the handle name and avatar</p>
         <p className='text-xs'>2-  Click mint button  &  wait for Partcle pop-up </p>
         <p className='text-xs'>3-  Click screnn to close exsiting modal and  sign Tx</p>
         <p className='text-xs'>4-  wait for  few seconds for tx   and  refresh your website</p>
         </div>
      <div className='w-[430px]  border border-gray-300  dark:border-gray-700 rounded-lg p-4 flex flex-col items-center  '>
       <div>
          <h1 className='font-semibold my-3 text-center'>Profile Avatar</h1>
           <div>
           <input
                type="file"
                accept="image/*"
                onChange={(e) => setchannelAvatar(e.target.files[0])}
                ref={selctAvatarRef}
                hidden
              />

               <div className='w-[150px] h-[150px] rounded-full border p-1 dark:border-blue-200 border-gray-400 flex items-center justify-center'>
                 <div className=' cursor-pointer '>
                  {
                    ! channelAvatar ? (
                      <LuImagePlus width={200} className='w-72' onClick= {() => {
                        selctAvatarRef.current.click();
                      }} />
                    ) : (
                       <img   src={URL.createObjectURL(channelAvatar)}
                       className="w-[140px] h-[140px] object-cover rounded-full"  />
                    )
                  }
                
                 </div>
               </div>
           </div>
       </div>

        <div className='my-3'>
        <h1 className=' my-3 text-sm '>Channel handle</h1>  
         <input
        type='text'
        placeholder='ex kabugu'
         onChange={(e) => setChannelHandle(e.target.value)}
         value={ChannelHandle}
         className='w-[370px] h-11 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

  />

    {
     
    }
        </div>

        <div className='my-3'>
        <h1 className=' my-3 text-sm '>Channel bio</h1>  
         <textarea
        placeholder='This  is  my channel'
         onChange={(e) => setchannelBio(e.target.value)}
         value={channelBio}
         className='w-[370px] resize-none h-24 rounded-lg p-2 bg-inherit border border-gray-400 placeholder:text-sm'

  />
        </div>


  <div className=''>
  <h1 className=' my-3 text-sm '>Your interests</h1>  
          <div className='my-4 flex space-x-4 w-full flex-wrap'>

{interests2.map((item, i)  =>  (
  <div  key={i} className={`flex space-x-1 items-center my-3 ${selectedInterests?.includes(item.value)  &&  "bg-green-500"} ${selected  === i  &&  "bg-green-400 "} py-2 px-3 rounded-xl cursor-pointer`} onClick={() => handleSelect(i, item.value)}> 
  <p>{item.emoji}</p>
  <p>{item?.name}</p>
   </div>
))}

          </div>
          </div>
       
         <Button className='bg-green-500 text-text-on-primary w-full rounded-lg' disabled={!ChannelHandle  || isCreating} onClick={() => createHandle()} variant={`ghost`} >  {isCreating  ? "Creating profile" : "Create Your Profile"}</Button>
         <Button className='  w-full rounded-lg mt-3 text-text'  onClick={closeModal} variant={`outline`}>Skip</Button>

      </div>
    
      </div>
  )
}
