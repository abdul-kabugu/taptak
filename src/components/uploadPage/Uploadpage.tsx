//@ts-nocheck

import { useState, useEffect } from "react";
import VideoMetadata from "./VideoMetadata";
import SelectVideoFile from "./SelectVideoFile";
import { useUserContext } from "@/providers/UserContext";
import Modal from "../common/Modal";
import CreateHandleModal from "../common/CreateHandleModal";
import {useAccount}  from 'wagmi'
export default function UploadPage() {
  const [videoFile, setvideoFile] = useState();
  const {toggleHandleModal, primaryProfile, isShowHandleModal, userAddress, userProfile} = useUserContext()
  const [test, settest] = useState(true)
  const {address} = useAccount()
  console.log("the selected file", videoFile);


    //CHECK  IF THE  USER  IS  NOT  AUTHORIZED   AND  ASK  HIM TO  SIGN MESSAGE 
  /*  useEffect(() => {
        if(!primaryProfile){
          toggleHandleModal()
        }
    }, [primaryProfile])*/
    

      if(! userProfile){
       return(
        <div className="w-full h-screen flex items-center justify-center">
          <div className="bg-green-400 py-4 px-5 rounded-xl">
        <p className="font-semibold text-3xl">Sign in</p>
        </div>
        </div>
       )
      }
  return (
    <div className=" min-h-screen px-2 flex items-center justify-center">
      {videoFile  ? (
        <VideoMetadata videoFile={videoFile} setVideoFile={setvideoFile} />
      ) : (
        <SelectVideoFile handleSelectFile={setvideoFile} />
      )}
        { ! primaryProfile &&
          userAddress &&  (
            <Modal isOpen={isShowHandleModal} closeModal={toggleHandleModal}>
         <CreateHandleModal closeModal={toggleHandleModal} />
       </Modal>
          )
        }

         
        
         
      
    </div>
  );
}
