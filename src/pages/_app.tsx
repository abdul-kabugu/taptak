//@ts-nocheck

import '@/styles/globals.css'

import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'

import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';
import { Toaster } from "@/components/ui/toaster"
import { NextSeo, DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic'
import { APP_NAME, LIVEPEER_KEY, WC_PROJECT_ID, WEBSITE_URL } from '@/assets/constant';
import { UserContextProvider } from '@/providers/UserContext';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { createReactClient, studioProvider,  LivepeerConfig } from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({ apiKey: LIVEPEER_KEY }),
});

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  fraxtal,
  fraxtalTestnet
} from 'wagmi/chains';


import {
  getDefaultConfig,
  RainbowKitProvider,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import { http, WagmiProvider, createConfig } from 'wagmi';
const PWAInstall = dynamic(() => import('../components/PwaInstall'), {
  ssr: false,
})





export default function App({ Component, pageProps }: AppProps) {

 
  const queryClient = new QueryClient();

  

  const config = createConfig({
   // appName: 'Pax pap',
   // projectId: 'YOUR_PROJECT_ID',
   connectors: [
    injected(),
    walletConnect({ projectId : "78d9d9d02e79cd400170c4e2643d1243" }),
    metaMask(),
    safe(),
  ],
    chains: [fraxtal, fraxtalTestnet],

     transports : {
       [fraxtal.id] : http(),
       [fraxtalTestnet.id] : http()
     },
     ssr: true,  //If your dApp uses server side rendering (SSR)
  });


 


  return (
    
   
    
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        
       >
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
        modalSize='compact'
        theme={midnightTheme()}
        >
         <LivepeerConfig client={client}>
      <Layout>
  
        <NextNProgress color="#4f46e5" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}  />
         <>
         <DefaultSeo
            title='rapu'
            description='rapu - decentralized video-sharing platform. designed to revolutionize your digital content experience.Take control of your content'
            openGraph={{
              url: `${WEBSITE_URL}`,
              title: 'rapu',
              description: 'rapu - decentralized video-sharing platform. designed to revolutionize your digital content experience.Take control of your content',
              images: [
                {
                  url: `/img/website-banner.png`,
                  width: 800,
                  height: 600,
                  alt: 'Og Image Alt',
                  type: 'image/jpeg',
                },
                {
                  url: `/img/website-banner.png`,
                  width: 900,
                  height: 800,
                  alt: 'Og Image Alt Second',
                  type: 'image/jpeg',
                },
              ],
              siteName: `${APP_NAME}`,
            }}
            twitter={{
              handle: '@rapu',
              site: '@rapu',
              cardType: 'summary_large_image',
            }}
         />
        
         <Component {...pageProps} />
        
         <PWAInstall />

         </>

    </Layout>
    </LivepeerConfig>
    <Toaster />
  </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
    </ThemeProvider>

  
   
  ) 
}


