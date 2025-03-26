import Agent from '@/component/Agent';
import DisplayTechIcons from '@/component/DisplayTechIcon';
import { getCurrentUser } from '@/lib/action/auth.action';
import { getInterviewById } from '@/lib/action/data';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}:RouteParams) => {

    const {id}=await params;
    const user=await getCurrentUser()
    const interview=await getInterviewById(id)
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
            <h3 className='capitalize'> {interview.role}</h3>
        </div>
        <DisplayTechIcons techStack={interview.techstack[0].split(" ")} />
    </div>
  <p className='bg-dark-200 px-4 py-2 rounded-lg'>{interview.type}</p>
   </div>

   <Agent userName={user?.name} userId={user?.id} type="interview"  interviewId={id} questions={interview?.questions} />
   </>

  )
}

export default page
