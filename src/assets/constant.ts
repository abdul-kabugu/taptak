import { HeartOutline, HomeOutline, ShortsOutline, StarOutline, } from "@/components/common/Icons";
import { Livepeer } from "livepeer";
import { IoStarOutline } from "react-icons/io5";
export const fakeArray = [1, 2, 3, 4, 5, 6];
export const fakeArray_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const  contractAddress = "0xdE3309F5513B2f88daf325ED8841404d74049Ea3"
export const LIVEPEER_KEY = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY;
export const PINATA_PROJECT_ID = process.env.NEXT_PUBLIC_PINATA_PROJECT_ID;
export const PINATA_APP_SECRET = process.env.NEXT_PUBLIC_PINATA_APP_SECRET;
export const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
export const PARTICLE_PROJECT_ID =   process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID
export const PARTICLE_CLIENT_KEY =   process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY
export const PARTICLE_APP_ID =   process.env.NEXT_PUBLIC_PARTICLE_APP_ID

export const IPFS_GATEWAY = "https://ipfs.subsocial.network/ipfs/";
export const IPFS_GATEWAY2 = 'https://ipfs.crossbell.io/ipfs/'
export const WEBSITE_URL = "https://www.paxfy.xyz"
  export  const sidebarNav  = [
    {
        title : "Home",
        icon : HomeOutline,
        to : '/'
    },
    {
        title : "Shorts",
        icon : ShortsOutline,
        to : '/shorts'
    },
    {
        title : "Following",
        icon : HeartOutline,
        to : '/feed'
    },

  ]

  export  const categories  = [
    {
        title : "Featured",
        icon : IoStarOutline,
        to : '/trending'
    },
 

  ]

  export const APP_NAME = "Zenvid"
  export const APP_ID = "zenvid_v1"
  export const SHORT_APP_ID = "Zshorts_v1"
  export const APP_DESCRIPTION = "Create, Collect, Connect"
  export const ZENVID_X_HANDLE ="_paxfy"
  export const base64File ="data:image/jpeg;base64,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"
  // infinite scroll
export const INFINITE_SCROLL_ROOT_MARGIN = '800px'

  export const shortTest = [
    {
      title: 'This is my new creation and happy new year',
      creator: 'kabugu',
      cover:
        'https://ik.imagekit.io/lenstube/tr:w-720,h-404/https://ik.imagekit.io/lens/media-snapshot/7de254274587b1af2e34b7c539287937c069072b390282f95a74ec1e2057e895.png',
      id: 1,
      video:
        'https://ipfs.livepeer.studio/ipfs/QmURv3J5BGsz23GaCUm7oXncm2M9SCj8RQDuFPGzAFSJw8',
    },
    {
      title: 'This is my new creation and happy new year',
      creator: 'kabugu',
      cover:
        'https://ik.imagekit.io/lenstube/tr:w-720,h-404/https://ik.imagekit.io/lens/media-snapshot/7de254274587b1af2e34b7c539287937c069072b390282f95a74ec1e2057e895.png',
      id: 1,
      video:
        'https://ipfs.livepeer.studio/ipfs/QmURv3J5BGsz23GaCUm7oXncm2M9SCj8RQDuFPGzAFSJw8',
    },
    
  ]

export const  SC_CONTRACT_ADDRESS = "0x11498defec33a74146d984c5a8c5d3c2fbe32ace"
export const  TOKEN_ADDRESS ="0x32754b0f673e7b91c7f81cb7900E4709c4E29222"
export const  TOKEN_1_CONTRACT   =  "0x89f24f95467396EABC0fe4305DAC8859d32BCDb4"
export const   SC_ADDRESS_TWO  =  "0x0e6Abfec5138D9cd3228Eb1142509A8c5b8c93f6"
export  const TOKEN_2_CONTRACT = "0xACC6a9a65Ef0D7ec665E312b6aDCBD2D69077631"
  export const livepeer = new Livepeer({
    apiKey: "4e422631-1a08-47c8-8e5f-4c94bcea554f", // Your API key
  })

 
  

  export const tipTier = [
    { amount: 5, name: "High Five", emoji: "🖐️" },
    { amount: 10, name: "Perfect Ten", emoji: "🔟" },
    { amount: 15, name: "Sweet Spot", emoji: "🎯"
},
{ amount: 20, name: "Twenties Twist", emoji: "💫" },
{ amount: 25, name: "Silver Splash", emoji: "🌊" },
{ amount: 30, name: "Thrifty Thrill", emoji: "🎈" },
{ amount: 35, name: "Lucky Leap", emoji: "🍀" },
{ amount: 40, name: "Fab Forty", emoji: "💃" },
{ amount: 45, name: "Cheers Charm", emoji: "🥂" },
{ amount: 50, name: "Golden Give", emoji: "🌟" },
{ amount: 55, name: "Fifty-Five Fling", emoji: "💃" },
{ amount: 60, name: "Sixty Sparkle", emoji: "✨" },
//{ amount: 65, name: "Radiant Rise", emoji: "☀️" },
//{ amount: 70, name: "Heavenly Help", emoji: "😇" },
//{ amount: 75, name: "Joyful Jump", emoji: "🌈" },
//{ amount: 80, name: "Energetic Eighty", emoji: "💥" },
//{ amount: 85, name: "Breezy Boost", emoji: "🌬️" },
//{ amount: 90, name: "Nifty Ninety", emoji: "🎩" },
//{ amount: 95, name: "Vibrant Victory", emoji: "🏆" },
//{ amount: 100, name: "Century Celebration", emoji: "🎉" }
];




const interests = [
  { name: "Technology", value: "technology" },
  { name: "Travel", value: "travel" },
  { name: "Food", value: "food" },
  { name: "Fitness", value: "fitness" },
  { name: "Music", value: "music" },
  { name: "Movies", value: "movies" },
  { name: "Gaming", value: "gaming" },
  { name: "Sports", value: "sports" },
  { name: "Fashion", value: "fashion" },
  { name: "Art", value: "art" },
  { name: "Photography", value: "photography" },
  { name: "Books", value: "books" },
  { name: "Science", value: "science" },
  { name: "Health", value: "health" },
  { name: "DIY", value: "diy" },
  { name: "History", value: "history" },
  { name: "Nature", value: "nature" },
  { name: "Comedy", value: "comedy" },
  { name: "Education", value: "education" },
  { name: "Business", value: "business" }
];


export const interests2 = [
  { name: "Technology", value: "technology", emoji: "💻" },
  { name: "Travel", value: "travel", emoji: "✈️" },
  { name: "Food", value: "food", emoji: "🍔" },
  { name: "Fitness", value: "fitness", emoji: "🏋️‍♂️" },
  { name: "Music", value: "music", emoji: "🎵" },
  { name: "Movies", value: "movies", emoji: "🎬" },
  { name: "Gaming", value: "gaming", emoji: "🎮" },
  { name: "Sports", value: "sports", emoji: "⚽" },
  { name: "Fashion", value: "fashion", emoji: "👗" },
  { name: "Art", value: "art", emoji: "🎨" },
  { name: "Photography", value: "photography", emoji: "📷" },
  { name: "Books", value: "books", emoji: "📚" },
  { name: "Science", value: "science", emoji: "🔬" },
  { name: "Health", value: "health", emoji: "💪" },
  { name: "DIY", value: "diy", emoji: "🛠️" },
  { name: "History", value: "history", emoji: "🏛️" },
  { name: "Nature", value: "nature", emoji: "🌲" },
  { name: "Comedy", value: "comedy", emoji: "😂" },
  { name: "Education", value: "education", emoji: "🎓" },
  { name: "Business", value: "business", emoji: "💼" }
];
