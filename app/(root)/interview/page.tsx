
import Agent from '@/component/Agent'
import { getCurrentUser } from '@/lib/action/auth.action'
import React from 'react'

const page =async () => {
    const user=await getCurrentUser();

  return (
  <>
  <h3>Interview Generation</h3>
  <Agent userName={user?.name} userId={user?.id} type="" />
  </>
  )
}

export default page
