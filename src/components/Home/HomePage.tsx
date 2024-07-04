//@ts-nocheck

import React, {useState, useEffect} from 'react'
import { VideoCard } from '../cards'
import { fakeArray, fakeArray_2, shortTest } from '@/assets/constant'
import { useDiscoverVideos } from '@/hooks/useDiscoverVideos'
import VideoCardSpinner from '../skeletons/VideoCardSpinner'
import Image from 'next/image'
import { installApp, isInstallAvailable} from '@/lib/install'
import Button from '../common/Button'
import Input from '../common/inputs/Input'
import TopSection from '../TopSection/TopSection'
import LatestShorts from '../TopSection/LatestShorts'
import ShortsSkeleton from '../skeletons/ShortSkeleton'
import NoData from '../common/NoData'
import { APP_ID } from '@/assets/constant'
import axios from 'axios'
  // flex gap-4 flex-wrap md:px-1
import Link from 'next/link'
import { useUserContext } from '@/providers/UserContext'

import { useGetAllVideos } from '@/hooks/useGetAllVideos'
import Modal from '../common/Modal'
import CreateHandleModal from '../common/CreateHandleModal'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
//import { useUserContext } from '@/providers/UserContext'


  // data?.notes?.length > 1 && data?.notes?.filter(video => video.metadata?.content?.tags[0] !== "comment").map((note, i) =>
export default function HomePage() {
  const {data, loading, error, isError, fetchVideos} = useDiscoverVideos()
  const [testTruth, settestTruth] = useState(false)
const [allFilterePosts, setallFilterePosts] = useState([])
const [allPostswMetadata, setallPostswMetadata] = useState({})
   const {allVids, allVidsLoading, allVidsError} = useGetAllVideos()
  const {primaryProfile, isShowHandleModal, toggleHandleModal, userAddress, userProfile} = useUserContext()
  const [isSkipped, setisSkipped] = useState(false)
   

  const  {data: userData, isLoading : isUserDataLoading, refetcchUserInfo}  =  useGetUserInfo(userProfile?.id)

 const  USER_NAME  = userData?.username

   




      useEffect(() => {
      if(  userProfile && ! USER_NAME  && ! isSkipped){
       toggleHandleModal()
      }
      }, [userProfile])
      
     
       


if(allVidsLoading){
  return(
    <div className='flex flex-col gap-3 w-full '>
     {/*} <ShortsSkeleton  />*/}
<VideoCardSpinner />
    </div>

  )
 }

   if(isError || error){
    return(
      <div>
  <p>something went wrong</p>

  <button className='p-4 bg-yellow-400' onClick={() => fetchVideos()}>fetch  vids</button>
      </div>
    
    )
   }
    
  return (
    <div className='w-full '>
    
     {/*<TopSection  />*/}
   
     {data?.length  < 0 && (
      <div className='border-t border-border-gray'>
  <NoData title='No  Videos Yet' isFullPage={true}  />
  </div>
     )}

    <div className='2xl:grid-cols-6 grid-col-1 xl:grid-cols-4 sm:grid-cols-3 grid gap-x-4 gap-y-2 sm:gap-y-6 px-1 md:px-2 mt-4  min-h-screen '>
     
    {
      data?.map((video, i) => (
        <VideoCard 
        key={i} 
        video={video} 
        title={video?.title}
         cover={video?.thumbnail}
         channel={video?.author}
         channelId={video?.author}
         noteId={video?._id}
         createdAt={video?.createdAt}
        />
      ))
    }

   
   
    </div>

 {
  ! primaryProfile  &&  userAddress &&
  <Modal isOpen={isShowHandleModal} closeModal={toggleHandleModal} >
    <CreateHandleModal  closeModal={toggleHandleModal} />
 </Modal>
 }
 
    </div>
  )
}
