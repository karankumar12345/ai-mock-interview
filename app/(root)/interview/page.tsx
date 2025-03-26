/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Agent from '@/component/Agent'
import { getCurrentUser } from '@/lib/action/auth.action'
import React from 'react'

const page =async () => {
    const user=await getCurrentUser();

    console.log(user)
  return (
  <>
  <h3>Interview Generation With Ai</h3>
  <Agent   userName={user?.name!}
  
        userId={user?.id}   type="generate"/>
  </>
  )
}

export default page
