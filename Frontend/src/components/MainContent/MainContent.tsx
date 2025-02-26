import NoFriends from "../icons svgs/NoFriends";
import NavPanel from "../Navbar/NavPanel";

export default function MainContent() {
  return (
    <>
      <NavPanel/>
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-[#313338] border-b border-gray-700">
          <div className="flex items-center gap-5 text-[#c3c7ce] text-sm">
            <div className="flex items-center gap-3">
              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" ></path><path fill="currentColor" d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z"></path></svg>
              <p className="text-md ">Friends</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-md ">Online</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-md ">All</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-md ">Pending</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-md ">Block</p>
            </div>
            <div className="flex items-center px-2 py-[2px] rounded-lg gap-3 text-white bg-[#248046]">
              <p className="text-md ">Add Friend</p>
            </div>
          </div>
        </div>
        <hr className='border-[#404247]' />
        {/* Content */}
        <div className="flex h-full">
          <div className="flex-1 flex flex-col items-center justify-center bg-[#313338]">
            <NoFriends />
          </div>
          <div className="w-64 bg-[#313338] border-l border-gray-700 p-4">
            <div className="text-white text-md font-semibold">Active Now</div>
            <p className="mt-2 text-gray-300 text-sm">
              Its quiet for now... When a friend starts an activity, we’ll show
              it here!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
