import CreateTokensPage from '@/components/CreateTokensPage'
import withAuth from '@/middleware/AuthMiddleware'
import React from 'react'

const tokens = () =>{
  return (
    <div>
        <CreateTokensPage  />
    </div>
  )
}

export default withAuth(tokens)
