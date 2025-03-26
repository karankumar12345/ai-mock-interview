import Agent from '@/component/Agent'
import React from 'react'

const page = () => {
  return (
  <>
  <h3>Interview Generation</h3>
  <Agent userName="YOU" userId="user!" type="generate" />
  </>
  )
}

export default page
