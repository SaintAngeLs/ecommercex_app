export default function Googleimage({ session }) {
    return (
      <div className="hidden bg-bgSecondColor sticky top-0 shadow-md -m-4 -mx-7 p-4 py-2 mb-1 justify-center">
        <div className="flex items-center">
          <img src={session?.user?.image} alt="" className="w-10 h-10 rounded-[4px]" />
        </div>
      </div>
    );
  }
  