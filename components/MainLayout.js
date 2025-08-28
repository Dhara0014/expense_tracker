import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-white p-10 rounded-2xl shadow-md w-3xl">
        {children}
    </main>
    </div>
  )
}   

export default MainLayout