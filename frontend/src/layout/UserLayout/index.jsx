import NavBarComponent from '@/Component/Navbar'
import React from 'react'

export default function UserLayout({children}) {
  return (
    <div>
        
      <NavBarComponent/>
        {children}
    </div>
  )
}
