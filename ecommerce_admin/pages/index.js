import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'



export default function Home() {
  const {data: session} = useSession();

  return <Layout> 
      <div className='text-blue-900 flex justify-between'>
        <h3>
          Hello, <b>{session?.user?.name}</b>
        </h3>
        <div className="flex g-1 bg-gray-200 text-black rounded-r-lg">
          <img src = "{session?.user?.image}" alt = "" className='h-6 w-5 rounded-full'/> 
          <span className = " px-1">
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>
  
}


