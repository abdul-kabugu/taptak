//@ts-nocheck

import { IPFS_GATEWAY2, IPFS_GATEWAY, shortTest, SHORT_APP_ID } from '@/assets/constant'
import { useDiscoverShorts } from '@/hooks'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserContext } from '@/providers/UserContext'
import { useGetAllVideos } from '@/hooks/useGetAllVideos'
//@ts-ignore
import ShortsSkeleton from '../skeletons/ShortSkeleton'
import NoData from '../common/NoData'
import { useDiscoverVideos } from '@/hooks/useDiscoverVideos'
export default function LatestShorts() {
  const {data, loading, error} = useDiscoverVideos()

  const [allFilterePosts, setallFilterePosts] = useState([])
  const [allPostswMetadata, setallPostswMetadata] = useState({})
     const {allVids, allVidsLoading, allVidsError} = useGetAllVideos()
    const {primaryProfile, isShowHandleModal, toggleHandleModal} = useUserContext()
       console.log("see all videos  with metadata", allPostswMetadata)
       console.log("see all  filtered videos  ", allFilterePosts)
  
  
       console.log("the primary profile", primaryProfile)
    
     
  
  
        useEffect(() => {
        if(! primaryProfile){
         toggleHandleModal()
        }
        }, [])
        
       







   console.log("short videos", allFilterePosts)

   if(loading){
    return <ShortsSkeleton  />
   }

   if(data?.length  < 0){
    return(
      <NoData title='No Short Videos Yet' isFullPage={false}  />
    )
   }

    // lLink to specific short 

   //  /${item?.characterId }-${item.noteId}
  return (
    <div className='flex gap-x-4   '>
      {/*@ts-ignore */}
       {data?.map((item , i) => (
       <Link href={`/shorts/${item._id}`} key={i}>
       <div className='h-[350px] w-[200px] rounded-lg bg-black md:w-[210px]  lg:w-[230px]'>
         <Image
           src={`${IPFS_GATEWAY}${item?.thumbnail}`}
           className='h-[350px] w-[230px] rounded-lg object-cover'
           width={230}
           height={350}
           alt='short-clip_cover'
         />
       </div>
     </Link>

       ))}
      
 
    </div>
  )
}
