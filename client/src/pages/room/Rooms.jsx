import React from 'react'
import { FaBed } from 'react-icons/fa'

export default function Rooms() {
  return (
    <>
<div className="flex items-center gap-3 p-5 rounded-lg cursor-pointer hover:bg-gray-100">
           <FaBed size={18} />
           <span>Rooms</span>
         </div>

    </>
  )
}
