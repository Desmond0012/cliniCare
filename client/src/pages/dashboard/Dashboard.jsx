import React from 'react'
import { FaThLarge } from 'react-icons/fa'

export default function Dashboard() {
  return (
    <>
<li className="flex items-center gap-3 p-5 rounded-lg cursor-pointer text-blue-500 bg-blue-100">          
    <FaThLarge size={18} />
           <span className="font-medium">Dashboard</span>
 </li>

    </>
  )
}
