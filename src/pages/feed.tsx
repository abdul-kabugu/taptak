import NoData from '@/components/common/NoData'
import withAuth from '@/middleware/AuthMiddleware'
import React from 'react'


const  feed = () => {
  return (
    <div>
        <NoData  />
    </div>
  )
}

export default withAuth(feed);
