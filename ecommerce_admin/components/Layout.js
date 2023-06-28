
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar'
import { useState } from 'react';
import Logo from './Logo';


export default function Layout({children}) {
  const {data: session} = useSession();
  const [showNavbar, setShowNavbar] = useState(false);
  if(!session)
  {
    return (
      <div className="bg-bgGray w-screen h-screen flex justify-between items-center">
        <div className='text-center w-full'>
          <button onClick = {() => {signIn('google')}} className='bg-white p-2 rounded-lg'>Login with google</button>
        </div>
      {/* <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
        </div> */}
      </div>
    )
  }
  return (
    <div className='bg-bgGray min-h-screen p-5'>
      <div className="flex md:hidden items-center" >
        <button onClick={() => setShowNavbar(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
        </svg>

        </button>
        <div className='flex grow justify-center mr-6'> 
          <Logo/>
        </div>
        
      </div>
      
      <div className='bg-bgGray min-h-screen flex'>
        <Navbar show = {showNavbar}/>
        <div className="flex-grow p-5">{children}</div>
      </div>
    </div> 
  );
 
  
  
}


