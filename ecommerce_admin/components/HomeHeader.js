import {useSession} from "next-auth/react";

export default function HomeHeader() {
  const {data:session} = useSession();
  
  return (
    <div className="hidden bg-bgSecondColor sticky top-0 shadow-md -m-4 -mx-7 p-4 py-2 mb-1 place-items-center sm:flex justify-end">
      <div className="hidden sm:block">
        <div className="flex gap-1 py-2 text-primary font-bold place-items-center">
          <img src={session?.user?.image} alt="" className="w-10 h-10 rounded-[4px]"/>

          <div className="flex flex-col">
            <span className="px-3">
              {session?.user?.name}
            </span>

            <span className="px-3 font-normal text-xs">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}