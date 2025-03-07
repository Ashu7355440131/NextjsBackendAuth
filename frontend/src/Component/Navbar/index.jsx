import React from 'react'
import styles from './style.module.css'
import { useRouter } from 'next/router'
export default function NavBarComponent() {
  const router=useRouter();
  return (
    
    <div className={styles.container}>
     <nav className={styles.navBar}>
        <h1 onClick={()=>{
          router.push("/")
        }}>Name</h1>
        <div className={styles.navBarOptionContainer}>

          <div onClick={()=>{
            router.push("/login")
          }} className={styles.handleConnect}>
            <p>Login</p>
          </div>

        </div>
     </nav>
    </div>
  )
}
