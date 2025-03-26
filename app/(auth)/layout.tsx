import { isAuthenticated } from '@/lib/action/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async({children}:{children:ReactNode}) => {
  const isuserAuthenticated=await isAuthenticated();
  if( isuserAuthenticated){
    redirect("/dashboard");
  }
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default layout
