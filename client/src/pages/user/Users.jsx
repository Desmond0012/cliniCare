import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function Users() {
  return (
    <>
     <div className="flex items-center gap-3 p-5 rounded-lg cursor-pointer hover:bg-gray-100">
            <FaUser size={18} />
            <span>Users</span>
         </div>
    </>
  )
}
