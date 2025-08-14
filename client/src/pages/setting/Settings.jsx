import React from 'react'
import { FaCog } from 'react-icons/fa'

export default function Settings() {
  return (
    <>
    <div className="flex items-center gap-3 p-5 rounded-lg cursor-pointer hover:bg-gray-100">
         <FaCog size={18} />
            <span>Setting</span>
         </div>
    </>
  )
}
