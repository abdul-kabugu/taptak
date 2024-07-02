//@ts-nocheck
import { APP_NAME, APP_DESCRIPTION, APP_ID, INFINITE_SCROLL_ROOT_MARGIN, SHORT_APP_ID } from '@/assets/constant'
import { useInView } from 'react-cool-inview'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ShortVideo from './ShortVideo'
import { KeyboardControls, WheelControls } from './SliderPlugin'
import MetaTags from '../common/MetaTags'
import NoData from '../common/NoData'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// Function to fetch all posts
const fetchAllPosts = async () => {
  const response = await fetch('https://sapo-rdii.onrender.com/api/post/get-posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Bytes = () => {
  const router = useRouter();
  const [currentViewingId, setCurrentViewingId] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [allFilterePosts, setAllFilterePosts] = useState([]);
  const [allPostswMetadata, setAllPostswMetadata] = useState({});
  const [singleByteWithMetadata, setSingleByteWithMetadata] = useState();

  const { id } = router.query;

  const { data, error, isLoading, refetch, fetchMore } = useQuery({ queryKey :'fetchPosts', queryFn : fetchAllPosts, 
    enabled: false, // Disabled by default, enable it when needed
    onSuccess: (data) => {
      const items = data?.posts;
      setAllPostswMetadata(items);

      const filteredPosts = items.filter(post =>
        post.appId === SHORT_APP_ID
      );

      setAllFilterePosts(filteredPosts);

      if (!id) {
        const nextUrl = `${location.origin}/shorts/${items[0]?.characterId}-${items[0].noteId}`;
        router.push(nextUrl);
      }
    },
  });

  const { observe } = useInView({
    threshold: 0.25,
    rootMargin: INFINITE_SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        // You need to implement your pagination logic here
      });
    }
  });

  const fetchSingleByte = async () => {
    const { id } = router.query;

    if (!id) {
      await refetch();
      return;
    }

    const [profileId, postId] = id.split("-");
    const ProfileId_persed = parseInt(profileId, 10);
    const PostId_parsed = parseInt(postId, 10);

    if (!id) {
      await refetch();
    }

    const singleByte = data.find(post => post.id === id);
    setSingleByteWithMetadata(singleByte);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchSingleByte();
    }
  }, [router.isReady, id]);

  if (isLoading) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <p>LOADING...</p>
      </div>
    );
  }

  if (error ||  !singleByteWithMetadata) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <NoData title='No Short Videos Yet' isFullPage={true} />
      </div>
    );
  }

  return (
    <div className='relative h-[calc(100vh-7rem)] overflow-y-hidden focus-visible:outline-none md:h-[calc(100vh-4rem)]'>
      <MetaTags title="Shorts" />
      <div
        ref={sliderRef}
        className='keen-slider h-[calc(100vh-7rem)] snap-y snap-mandatory focus-visible:outline-none md:h-[calc(100vh-4rem)]'
      >
        {singleByteWithMetadata && (
          <ShortVideo
            video={singleByteWithMetadata}
            currentViewingId={currentViewingId}
            intersectionCallback={(id) => setCurrentViewingId(id)}
          />
        )}
        {allPostswMetadata?.filter(video => video?._id !== id).map((video, index) => (
          <ShortVideo
            video={video}
            currentViewingId={currentViewingId}
            intersectionCallback={(id) => setCurrentViewingId(id)}
            key={`${video?.id}_${index}`}
          />
        ))}
      </div>
      <div className='laptop:right-6 ultrawide:right-8 bottom-2 right-4 hidden flex-col space-y-2 md:absolute md:flex'>
        <button
          className='bg-gallery rounded-full p-3 focus:outline-none dark:bg-gray-800 bg-teal-100'
          onClick={() => slider?.prev()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m4.5 15.75 7.5-7.5 7.5 7.5'
            />
          </svg>
        </button>
        <button
          className='bg-gallery rounded-full p-3 focus:outline-none dark:bg-gray-800 bg-teal-100'
          onClick={() => slider?.next()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Bytes;
