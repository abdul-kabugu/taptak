import ChannelPage from '@/components/channel/ChannelPage'
import { GET_CHANNEL_INF0_BY_ID } from '@/graphql/fragments/getChannelInfo'
import React from 'react'
import { apolloClient } from '@/graphql/apolloClient'
import { NextSeo } from 'next-seo'
import { IPFS_GATEWAY2 } from '@/assets/constant'
import { QueryClient, dehydrate } from '@tanstack/react-query'
export default function channel({data, dehydratedState}: any) {

  

   let  userData =  dehydratedState?.queries[0]?.state?.data

   console.log("the data from profile", userData)

     const  USER_ADDRESS = userData?.address
     const  USER_NAME =  userData?.username
     const   USER_XP = userData?.xp
     const USER_FOLLOWERS = userData?.followers?.length
     const USER_FOLLOWING = userData?.following?.length
     const USER_BIO  = userData?.bio
 
  return (
<>
<NextSeo
  title={USER_NAME || USER_ADDRESS}
  description={USER_BIO}
   openGraph={{
    images : [
      {
        url : `/img/website-banner.png`,
        width: 800,
            height: 600,
            alt: 'Og Image Alt',
      }
    ]
   }}
/>
<ChannelPage  data = {data} name={USER_NAME} followers={USER_FOLLOWERS} />
</>
 

  )
}

export async function getServerSideProps({ params }: any) {
  const { channelId } = params;

  const ChannelId_persed = parseInt(channelId, 10);
// Fetch the post data using  apollo client
const fetchUser = async () => {
  try {
    const data = await fetch(`https://sapo-rdii.onrender.com/api/auth/profile/${channelId}`)
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

await queryClient.prefetchQuery({queryKey : ["vide-by-id"], queryFn : fetchUser})



return {
  props : {
    dehydratedState: dehydrate(queryClient),
      userId : channelId,
     // loading :  false,
     // error : error

  }
}

     
}

