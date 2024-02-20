import React from 'react'
import Logo from '../components/ui/Logo'
import { faker } from "@faker-js/faker"
import ImageWithFallback from '../components/ui/ImageWithFallback'


function Homepage() {
  return (
    <div className='text-center'>
        <div className='p-10 flex flex-col gap-3'>
          <Logo />
          <h2 className='text-2xl font-bold'>Welcome to Infogram</h2>
        </div>

        <div className='grid grid-cols-3'>
          {Array.from({length: 9}).map((_, index) => (
            <div key={index} className='p-4'>
              <ImageWithFallback imgUrl={faker.image.url()} />
            </div>
          ))}

        </div>
    </div>
  )
}

export default Homepage