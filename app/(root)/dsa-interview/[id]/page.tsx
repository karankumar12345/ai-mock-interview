

import DSAAGENT from '@/component/DsaAgent';
import { getCurrentUser } from '@/lib/action/auth.action';
import { GetDsaInterview } from '@/lib/action/data';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}:RouteParams) => {

    const {id}=await params;
    const user=await getCurrentUser()
    const interview=await GetDsaInterview(id)
if(!interview){
    redirect('/')
}

console.log(interview)

  return (
   <>
   <div className='flex flex-row gap-4 justify-between'>
    <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
        <div className='flex flex-row gap-4 items-center'>
            <Image src={getRandomInterviewCover()}
            alt='interview cover' width={40} height={40} className='rounded-full object-cover size-[40px]' />
            <h3 className='capitalize'> {interview.topic}</h3>
        </div>

    </div>
  <p className='bg-dark-200 px-4 py-2 rounded-lg'>{interview.difficulty}</p>
   </div>

   <DSAAGENT userName={user?.name} userId={user?.id} type="interview"  interviewId={id} questions={interview?.questions} />
   </>

  )
}

export default page
