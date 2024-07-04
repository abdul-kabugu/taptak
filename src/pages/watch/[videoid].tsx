import React, {useState} from 'react'
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import VideoPage from '@/components/watch/VideoPage';
import { IPFS_GATEWAY2 } from '@/assets/constant';
import Head from 'next/head';
import { GET_VIDEO_BY_ID } from '@/graphql/fragments/getVideoById';
import { NextSeo } from 'next-seo';
import VideoFullSkeleton from '@/components/skeletons/FullVideoSkeleton';
import { GET_FULL_VIDEO } from '@/graphql/fragments/getFullVideo';
import { WEBSITE_URL } from '@/assets/constant';
import { QueryClient, dehydrate } from '@tanstack/react-query';
export default function VideoId({post, loading, dehydratedState} : any) {
    const router = useRouter();
    const { videoid } = router.query;
    console.log("the video id oooo", videoid);

    console.log("the  dehirdited state  is", dehydratedState);
    // Add error checking for router.query
    if (!router || !videoid) {
      return <div>Loading...</div>;
    }

  let  videoData =  dehydratedState?.queries[0]?.state?.data

    let  VIDEO_SOURCE  = videoData?.appId
    let CREATOR_ID =  videoData?.author
    let VIDEO_TAGS = videoData?.tags
    let VIDEO_CATEGORY =  videoData?.category
    let VIDEO_CREATED_AT = videoData?.createdAt
    let VIDEO_CAPTION = videoData?.content
    let VIDEO_LIKES = videoData?.likes
    let VIDEO_THUMBNAIL = videoData?.thumbnail
    let VIDEO_PLAYBACK_ID =  videoData?.media
    let VIDEO_TITLE =  videoData?.title

    let  videoState =  dehydratedState?.queries[0]?.state


   //@ts-ignore
   if(loading){
    return(
     < VideoFullSkeleton  />
    )
   }
   
    const activeVideo  = post?.posts[0]

  return (
    <>
   <NextSeo
    title={activeVideo?.title}
    description={activeVideo?.content}
       openGraph={{
        title : activeVideo?.title,
        description: activeVideo?.content ,
        url : `${WEBSITE_URL}/watch/${activeVideo?.profile?.id}-${activeVideo?.id}`,
         images :[
          {
            url : `${IPFS_GATEWAY2}${activeVideo?.cover}`,
            width: 800,
            height: 600,
            alt: `${activeVideo?.content} `,
            type: 'video/mp4',
            
          }
         ],
         siteName : "rapu"
       }}
    
   />
 
        <VideoPage 
          videoUri={VIDEO_PLAYBACK_ID}
          videoCover={VIDEO_THUMBNAIL}
          videoTitle={activeVideo?.title}
          createdAt={"wait" }
          channelId={CREATOR_ID}
          vidStats={"none"} 
          channelInfo={CREATOR_ID}
          videoId={videoid}
          loading={loading}
        />


        
      
    </>
  )
}

export async function getServerSideProps({ params }: any) {
    const { videoid } = params;



          const fetchVideo = async () => {
            try {
              const data = await fetch(`https://sapo-rdii.onrender.com/api/post/${videoid}`)
                .then(res => res.json())
                .catch(err => {
                  console.log("the error while fetching", err);
                  throw err;  // Re-throw the error to be caught in the outer try-catch
                });
          
              console.log("the videos data", data);
              return data;
            } catch (error) {
              console.log("the error while fetching", error);
              return null;  // Return null or an appropriate fallback value
            }
          };

            // Create a new QueryClient instance
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({queryKey : ["vide-by-id"], queryFn : fetchVideo})

 

        return {
            props : {
              dehydratedState: dehydrate(queryClient),
                videoId : videoid,
               // loading :  false,
               // error : error

            }
        }
  }
//