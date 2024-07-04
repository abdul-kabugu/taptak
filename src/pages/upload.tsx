import Uploadpage from '@/components/uploadPage/Uploadpage'
import withAuth from '@/middleware/AuthMiddleware'
import { NextSeo } from 'next-seo'
import React from 'react'

const  upload = () => {
  return (
      <>
      <NextSeo
    title='upload'
    description='upload to decentralized video sharing platform '
      />
       <Uploadpage  />
      </>
     
   
  )
}

export default withAuth(upload)
