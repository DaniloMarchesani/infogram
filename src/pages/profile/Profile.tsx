import React, { Suspense, useEffect } from 'react'
import Logo from '../../components/ui/Logo'
import { Inbox, Send } from 'lucide-react'
import { Avatar, Skeleton } from '@nextui-org/react'
import { faker } from "@faker-js/faker"

function Profile() {
  return (
    <div >
        <header>
            <nav className='flex justify-around items-center'>
                <Logo />
                <div className='flex items-center justify-center gap-4'>
                <Send  className='cursor-pointer size-7'/>
                <Inbox className='cursor-pointer size-7' />
                <Suspense fallback={<Skeleton className='cursor-pointer size-7' />}>
                    <Avatar src={faker.image.people()} className='cursor-pointer size-7' />
                </Suspense>
                </div>
            </nav>
        </header>

        <section className='flex flex-col items-center justify-center'>
            <div className='size-96 bg-gray-300'>
                <p>
                    here is the profile page
                </p>
            </div>
        </section>
    </div>
  )
}

export default Profile