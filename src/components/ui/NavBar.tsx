import React from 'react'
import Logo from './Logo'
import { Button } from '@nextui-org/react'

function NavBar() {
  return (
    <header className='w-full px-24 mb-20'>
        <nav className='flex justify-between items-center'>
            <Logo />
            <Button size='lg' variant='shadow' color='primary'>Login</Button>
        </nav>
    </header>
  )
}

export default NavBar